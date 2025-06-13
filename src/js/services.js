import { initBurger, initLogoSpinning, pictureRelocate, initLottieAnimations, initCaseSliding, initPopup, initScrollToTop } from "./common.js";
import "/src/sass/blocks/hero-common.scss";

document.addEventListener("DOMContentLoaded", () => {
	initBurger();
	initLogoSpinning();
	initLottieAnimations([
		{ selector: ".hero__picture", path: "/src/animation/services/services-main.json" },
		{ selector: ".ready__picture", path: "/src/animation/services/services-ready.json" },
	]);

	pictureRelocate("(max-width: 767.98px)", ".hero__wrapper", ".hero__picture", (container, picture) => {
		const title = container.querySelector(".hero__title");
		if (title) title.parentNode.insertBefore(picture, title.nextSibling);
	});

	pictureRelocate("(max-width: 1199.98px)", ".item-services", ".item-services__picture", (item, picture) => {
		const title = item.querySelector(".item-services__title");
		if (title && picture) {
			title.parentNode.insertBefore(picture, title.nextSibling);
		}
	});

	pictureRelocate("(max-width: 575.98px)", ".ready__wrapper", ".ready__picture", (container, picture) => {
		const prom = container.querySelector(".ready__prom");
		if (prom) prom.parentNode.insertBefore(picture, prom.nextSibling);
	});

	initCaseSliding();
	initPopup();
	initScrollToTop();
});
