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

    pictureRelocate("(max-width: 1199.98px)", ".item-services", ".item-services__picture", (item, picture) => {
		const title = item.querySelector(".item-services__title");
		if (title && picture) {
			title.parentNode.insertBefore(picture, title.nextSibling);
		}
	});
    
    initCaseSliding();
});
