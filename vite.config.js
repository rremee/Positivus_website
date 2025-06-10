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
					case "services":
						pageTitle = "Services";
						pageScript = "services.js";
						break;
					case "cases":
						pageTitle = "Use Cases";
						pageScript = "cases.js";
						break;
					case "price":
						pageTitle = "Pricing";
						pageScript = "price.js";
						break;
					case "blog":
						pageTitle = "Blog";
						pageScript = "blog.js";
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
				about: resolve(__dirname, "about.html"),
				services: resolve(__dirname, "services.html"),
				cases: resolve(__dirname, "cases.html"),
				price: resolve(__dirname, "price.html"),
				blog: resolve(__dirname, "blog.html")
			},
		},
	},
});
