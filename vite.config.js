import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import handlebars from 'vite-plugin-handlebars';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [
		handlebars({
			partialDirectory: resolve(__dirname, "src/partials"),
			context(pagePath) {
				const name = pagePath.replace(/^\//, "").replace(/\.html$/, "");
				let title = "";
				switch (name) {
					case "":
						title = "Positivus";
						break;
					case "about":
						title = "About Us";
						break;
					default:
						title = "Positivus";
				}
				return {pageTitle: title};
			}
		})
	],
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				about: resolve(__dirname, "about.html")
			},
		},
	},
});
