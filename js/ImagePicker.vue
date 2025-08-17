<template>
  <div class="gallery-container" style="background-color: transparent;">
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
  >
    <template #item="{ item, index }">
      <div class="gallery-item" @click="handleImageClick(item, index)">
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
    
    <!-- Full-screen modal -->
    <div v-if="isModalOpen" class="modal-overlay" @click="isModalOpen = false">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="isModalOpen = false">&times;</button>
        <img v-if="selectedImage" :src="selectedImage.url" class="modal-image" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, useTemplateRef } from 'vue';
import type { GalleryImage } from './types';
import { useModelState } from "@anywidget/vue";
import { Carousel } from 'vue-infinity';
import 'vue-infinity/style.css';

const galleryRef = useTemplateRef('carouselRef')
// const galleryItems = ref<GalleryImage[]>([]);
const galleryItems = useModelState<GalleryImage[]>('images');
const numRowsToShow = useModelState<number>('numRows');
const numColsToShow = useModelState<number>('numCols');
const height = useModelState<string>('height');
const width = useModelState<string>('width');
const gap = useModelState<string>('gap');
const verticalScroll = useModelState<boolean>('verticalScroll');
const carouselStyle = useModelState<Record<string, any>>('carouselStyle');
const itemStyle = useModelState<Record<string, any>>('itemStyle');
const lastScrolledToItemIndex = ref(0);
const isModalOpen = ref(false);
const selectedImage = ref<GalleryImage | null>(null);

// Handle image click event
const handleImageClick = (event: CustomEvent, index: number) => {
  console.log('Image clicked:', event);
  const payload = event.detail[0];
  selectedImage.value = payload.image;
  isModalOpen.value = true;
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
</style>