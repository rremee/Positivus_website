import { initBurger, initLogoSpinning, pictureRelocate, initLottieAnimations, initPopup, initScrollToTop } from "./common.js";
import "/src/sass/blocks/hero-common.scss";

document.addEventListener("DOMContentLoaded", () => {
	initBurger();
	initLogoSpinning();
	initLottieAnimations([
		{ selector: ".hero__picture", path: "/src/animation/about/about-main.json" },
		{ selector: ".quote__picture", path: "/src/animation/about/about-quote.json" },
		{ selector: ".join__picture", path: "/src/animation/about/about-join.json" },
	]);

	pictureRelocate("(max-width: 767.98px)", ".hero__wrapper", ".hero__picture", (container, picture) => {
		const title = container.querySelector(".hero__title");
		if (title) title.parentNode.insertBefore(picture, title.nextSibling);
	});
	initPopup();
	initScrollToTop();
});
