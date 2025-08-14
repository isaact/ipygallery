// import type { RenderProps } from "@anywidget/types";
import { createRender } from "@anywidget/vue";
import ImagePicker from "./ImagePicker.vue";
// import { type GalleryImage } from "vue-infinity";
// import "./widget.css";

/* Specifies attributes defined with traitlets in ../src/ipygallery/__init__.py */
// // src/index.js

const render = createRender(ImagePicker);

export default { render };

// registerElements();
// registerGalleryWidget();
/*
function render({ model, el }: RenderProps<WidgetModel>) {
	let gallery = document.createElement("gallery-widget-ce") as any;
	
	// Function to update images
	const updateGalleryImages = () => {
		if (gallery && typeof gallery.updateImages === 'function') {
			gallery.updateImages(model.get("images"));
		}
	};
	
	// Wait for the element to be fully initialized
	const initInterval = setInterval(() => {
		if (gallery && typeof gallery.updateImages === 'function') {
			clearInterval(initInterval);
			updateGalleryImages();
		}
	}, 10);
	
	// Timeout to prevent infinite waiting
	setTimeout(() => {
		clearInterval(initInterval);
		if (gallery && typeof gallery.updateImages === 'function') {
			updateGalleryImages();
		}
	}, 1000);
	
	// Listen for changes to the images
	model.on("change:images", () => {
		if (gallery && typeof gallery.updateImages === 'function') {
			gallery.updateImages(model.get("images"));
		} else {
			// If not ready yet, try again after a short delay
			setTimeout(() => {
				if (gallery && typeof gallery.updateImages === 'function') {
					gallery.updateImages(model.get("images"));
				}
			}, 50);
		}
	});
	
	el.appendChild(gallery);
	el.classList.add("ipygallery");
}

export default { render };
*/