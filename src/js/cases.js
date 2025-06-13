import {
	initBurger,
	initLogoSpinning,
	pictureRelocate,
	initLottieAnimations,
	initTestimonialsSwiper,
	initPopup
} from "./common.js";
import "/src/sass/blocks/hero-common.scss";

document.addEventListener("DOMContentLoaded", () => {
	initBurger();
	initLogoSpinning();
	initLottieAnimations([
		{ selector: ".hero__picture", path: "/src/animation/cases/cases-main.json" },
		{ selector: ".cta__picture", path: "/src/animation/cases/cases-cta.json" },
	]);

	pictureRelocate("(max-width: 767.98px)", ".hero__wrapper", ".hero__picture", (container, picture) => {
		const title = container.querySelector(".hero__title");
		if (title) title.parentNode.insertBefore(picture, title.nextSibling);
	});
	pictureRelocate("(max-width: 1023.98px)", ".cta__wrapper", ".cta__picture", (container, picture) => {
		const title = container.querySelector(".cta__title");
		if (title) title.parentNode.insertBefore(picture, title.nextSibling);
	});
	initTestimonialsSwiper();
	initPopup();
});
