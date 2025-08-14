export interface GalleryImage {
  thumbUrl?: string;
  url: string;
  title?: string;
}

interface WidgetModel {
	images: GalleryImage[];
    selectedImages: GalleryImage[];
    numRows?: number;
    numCols?: number;
    height?: string;
    width?: string;
}
