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
				let pageTitle = "";
				let pageScript = "";
				switch (name) {
					case "":
						pageTitle = "Positivus";
						pageScript = "home.js";
						break;
					case "about":
						pageTitle = "About Us";
						pageScript = "about.js";
						break;
					default:
						pageTitle = "Positivus";
						pageScript = "home.js";
				}
				return {pageTitle, pageScript};
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
