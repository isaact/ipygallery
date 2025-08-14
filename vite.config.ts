// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
	define: {
		"process.env": {},
	},
	plugins: [vue({
		template: {
			compilerOptions: {
				// treat all tags with a dash as custom elements
				isCustomElement: (tag) => tag.includes('-')
			}
		}
	})],
	build: {
		outDir: "src/ipygallery/static",
		cssCodeSplit: false,
		lib: {
			entry: "js/widget.ts",
			name: "ipygallery",
			formats: ["es"],
			fileName: "widget"
		},
		// rollupOptions: {
		// 	external: ["vue"],
		// 	output: {
		// 		globals: {
		// 			vue: "Vue"
		// 		}
		// 	}
		// }
	},
});