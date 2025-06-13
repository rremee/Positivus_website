import { initBurger, initLogoSpinning, initLottieAnimations, pictureRelocate, initPopup, initScrollToTop } from "./common.js";
import "/src/sass/blocks/hero-common.scss";

document.addEventListener("DOMContentLoaded", () => {
	initBurger();
	initLogoSpinning();
	initLottieAnimations([{ selector: ".hero__picture", path: "/src/animation/hero/hero-img.json" }]);

	pictureRelocate("(max-width: 1023.98px)", ".hero__wrapper", ".hero__picture", (container, picture) => {
		const title = container.querySelector(".hero__title");
		if (title) title.parentNode.insertBefore(picture, title.nextSibling);
	});
	initPopup();
	initScrollToTop();
});
