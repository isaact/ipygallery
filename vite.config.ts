// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		outDir: "src/ipygallery/static",
		lib: {
			entry: ["src/index.js"],
			formats: ["es"],
		},
	},
});