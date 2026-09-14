import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vite.dev/config/
export default defineConfig({
	base: "/hearthy-hue/",
	plugins: [
		react(),
		ViteImageOptimizer({
			svg: {
				multipass: true,
				plugins: [
					{
						name: "preset-default",
						params: {
							overrides: {
								cleanupNumericValues: false,
								cleanupIds: {
									minify: false,
									remove: false,
								},
								convertPathData: false,
							},
						},
					},
					"sortAttrs",
					{
						name: "addAttributesToSVGElement",
						params: {
							attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
						},
					},
				],
			},
			png: {
				// https://sharp.pixelplumbing.com/api-output#png
				quality: 20,
			},
			jpeg: {
				// https://sharp.pixelplumbing.com/api-output#jpeg
				quality: 20,
			},
			jpg: {
				// https://sharp.pixelplumbing.com/api-output#jpeg
				quality: 20,
			},
		}),
	],
});
