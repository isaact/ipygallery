<template>
  <div class="gallery-container" style="background-color: transparent;">
    <!-- Custom Tabs -->
    <div class="tabs">
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'all-images' }"
        @click="activeTab = 'all-images'"
      >
        All Images
      </button>
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'selected-images' }"
        @click="activeTab = 'selected-images'"
      >
        Selected Images
      </button>
    </div>
    
    <!-- Tab Content -->
    <div class="tab-content">
      <!-- All Images Tab -->
      <div v-show="activeTab === 'all-images'">
        <Carousel
          ref="carouselRef"
          :items="galleryItems"
          :height="height"
          :width="width"
          :numColsToShow="numColsToShow"
          :numRowsToShow="numRowsToShow"
          :gap="gap"
          :verticalScroll="verticalScroll"
          :carouselStyle="carouselStyle"
          @itemClick="handleImageClick"
        >
          <template #item="{ item, index }">
            <div
              class="gallery-item"
            >
              <img
                :src="item.url"
                :alt="item.alt || ''"
                class="gallery-image"
                :style="itemStyle"
              />
              <div v-if="item.title" class="image-title">
                {{ item.title }}
              </div>
            </div>
          </template>
          <template #loading="{ index }">
            <div class="loading-overlay">
              <div class="loading-spinner"></div>
              <p>Loading image {{ index }}...</p>
            </div>
          </template>
        </Carousel>
        
        <div class="controls">
          <input
            type="range"
            min="0"
            :max="galleryItems.length - 1"
            v-model="lastScrolledToItemIndex"
            @change="onSliderChange"
            @input="onSliderInput"
            class="slider"
          />
          <p>Current Item: {{ lastScrolledToItemIndex }}</p>
        </div>
      </div>
      
      <!-- Selected Images Tab -->
      <div v-show="activeTab === 'selected-images'">
        <Carousel
          v-if="selectedImages.length > 0"
          :items="selectedImages"
          :height="height"
          :width="width"
          :numColsToShow="numColsToShow"
          :numRowsToShow="numRowsToShow"
          :gap="gap"
          :verticalScroll="verticalScroll"
          :carouselStyle="carouselStyle"
          @itemClick="handleSelectedImageClick"
        >
          <template #item="{ item, index }">
            <div class="gallery-item selected">
              <img
                :src="item.url"
                :alt="item.alt || ''"
                :class="{ selected: selectedIndexes.includes(index) }"
                class="gallery-image"
                :style="itemStyle"
              />
              <div v-if="item.title" class="image-title">
                {{ item.title }}
              </div>
            </div>
          </template>
          <template #loading="{ index }">
            <div class="loading-overlay">
              <div class="loading-spinner"></div>
              <p>Loading image {{ index }}...</p>
            </div>
          </template>
        </Carousel>
        <div v-else class="no-selected-images">
          <p>No images selected yet. Select images from the "All Images" tab.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, useTemplateRef, computed } from 'vue';
import type { GalleryImage } from './types';
import { useModelState } from "@anywidget/vue";
import { Carousel } from 'vue-infinity';
import 'vue-infinity/style.css';

const galleryRef = useTemplateRef('carouselRef')
// const galleryItems = ref<GalleryImage[]>([]);
const galleryItems = useModelState<GalleryImage[]>('images');
const selectedIndexes = useModelState<number[]>('selectedIndexes');
const numRowsToShow = useModelState<number>('numRows');
const numColsToShow = useModelState<number>('numCols');
const height = useModelState<string>('height');
const width = useModelState<string>('width');
const gap = useModelState<string>('gap');
const verticalScroll = useModelState<boolean>('verticalScroll');
const carouselStyle = useModelState<Record<string, any>>('carouselStyle');
const itemStyle = useModelState<Record<string, any>>('itemStyle');
const lastScrolledToItemIndex = ref(0);

const selectedImages = computed(() : GalleryImage[] => {
  return Array.from(selectedIndexes.value).map(index => galleryItems.value[index]);
});

// Active tab
const activeTab = ref('all-images');

// Handle image click event
const handleImageClick = (payload: { item: GalleryImage; index: number; element: HTMLElement }) => {
  console.log('Image clicked:', payload);
  // const image = payload.item;
  const indexes = selectedIndexes.value;
  indexes.push(payload.index);
  selectedIndexes.value = indexes;
  console.log('Selected indexes updated:', selectedIndexes.value);
  console.log('Selected images updated:', selectedImages.value);

};

// Handle selected image click event (for the carousel in selected images tab)
const handleSelectedImageClick = (payload: { item: GalleryImage; index: number; element: HTMLElement }) => {
  console.log('Selected image clicked:', payload);
  const indexes = selectedIndexes.value;
  indexes.splice(indexes.indexOf(payload.index), 1);
  selectedIndexes.value = indexes;
};

const updateImages = (images: GalleryImage[]) => {
  galleryItems.value = images;
};

// Handle slider input (while dragging)
const onSliderInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  lastScrolledToItemIndex.value = parseInt(target.value, 10);
};

// Handle slider change (when released)
const onSliderChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const index = parseInt(target.value, 10);
  lastScrolledToItemIndex.value = index;
  
  // Scroll to the selected item
  if (galleryRef.value && typeof galleryRef.value.scrollToItem === 'function') {
    galleryRef.value.scrollToItem(index);
  }
};

onMounted(() => {
});

defineExpose({
  updateImages
});
</script>

<style scoped>
.gallery-demo {
  width: 100%;
  margin: 0 auto;
}
.gallery-item {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
  cursor: pointer;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.gallery-item.selected {
  border: 3px solid #007bff;
  border-radius: 8px;
}

.image-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem;
  text-align: center;
  font-size: 0.9rem;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.loading-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  color: #333;
  font-weight: bold;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #007bff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.controls {
  margin-top: 20px;
  text-align: center;
}

.slider {
  width: 80%;
  margin: 10px auto;
  display: block;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.close-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 36px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-button:hover {
  background: rgba(0, 0, 0, 0.7);
}

.modal-image {
  max-width: 80vw;
  max-height: 80vh;
  object-fit: contain;
}

/* Custom Tabs Styles */
.tabs {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
}

.tab-button {
  padding: 12px 24px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #64748b;
  transition: all 0.2s ease;
}

.tab-button:hover {
  color: #475569;
}

.tab-button.active {
  color: #007bff;
  border-bottom-color: #007bff;
}

.tab-content {
  min-height: 300px;
}

.no-selected-images {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #64748b;
  font-size: 16px;
}
</style>