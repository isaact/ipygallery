import type { RenderProps } from "@anywidget/types";
import { registerElements, type GalleryImage } from "vue-infinity";
import "./widget.css";

/* Specifies attributes defined with traitlets in ../src/ipygallery/__init__.py */
interface WidgetModel {
	images: GalleryImage[];
	/* Add your own */
}
registerElements();

function render({ model, el }: RenderProps<WidgetModel>) {
	let gallery = document.createElement("gallery-ce");
	gallery.updateImages(model.get("images"));
	
	// model.on("change:selectedImage", () => {
	// 	gallery.setAttribute("selected-image", model.get("selectedImage"));
	// });
	el.appendChild(gallery);

	el.classList.add("ipygallery");
}

export default { render };
