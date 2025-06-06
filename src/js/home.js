import {
	initBurger,
	initLogoSpinning,
	pictureRelocate,
	initLottieAnimations,
	initCaseSliding,
	initProcessAccordion,
	initTestimonialsSwiper,
	initContactFormTabs,
} from "./common.js";

import "/src/sass/blocks/hero-home.scss";

document.addEventListener("DOMContentLoaded", () => {
	initBurger();
	initLogoSpinning();

	pictureRelocate("(max-width: 1199.98px)", ".item-services", ".item-services__picture", (item, picture) => {
		const title = item.querySelector(".item-services__title");
		if (title && picture) {
			title.parentNode.insertBefore(picture, title.nextSibling);
		}
	});

	pictureRelocate("(max-width: 767.98px)", ".hero__container", ".hero__picture", (container, picture) => {
		const title = container.querySelector(".hero__title");
		if (title) title.parentNode.insertBefore(picture, title.nextSibling);
	});

	pictureRelocate("(max-width: 1023.98px)", ".cta__wrapper", ".cta__picture", (container, picture) => {
		const title = container.querySelector(".cta__title");
		if (title) title.parentNode.insertBefore(picture, title.nextSibling);
	});

	initLottieAnimations([
		{ selector: ".hero__picture", path: "/src/animation/hero/hero-img.json" },
		{ selector: ".cta__picture", path: "/src/animation/cta/cta.json" },
		{ selector: ".contact__picture", path: "/src/animation/contact/contact.json" },
	]);

	initCaseSliding();
	initProcessAccordion();
	initTestimonialsSwiper();
	initContactFormTabs();
});
