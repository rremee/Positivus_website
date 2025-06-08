import { initBurger, initLogoSpinning, pictureRelocate, initLottieAnimations, initCaseSliding } from "./common.js";
import "/src/sass/blocks/hero-services.scss";

document.addEventListener("DOMContentLoaded", () => {
	initBurger();
	initLogoSpinning();
	initLottieAnimations([{ selector: ".hero__picture", path: "/src/animation/services/services-main.json" }]);

	pictureRelocate("(max-width: 767.98px)", ".hero__wrapper", ".hero__picture", (container, picture) => {
		const title = container.querySelector(".hero__title");
		if (title) title.parentNode.insertBefore(picture, title.nextSibling);
	});
    initCaseSliding();
});
