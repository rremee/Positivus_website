import "/src/sass/style.scss";
import "/src/sass/blocks/hero-about.scss";

document.addEventListener("DOMContentLoaded", () => {
	//Burger
	const burger = document.querySelector(".burger"),
		menu = document.querySelector(".menu"),
		body = document.body;

	burger.addEventListener("click", () => {
		const isActive = menu.classList.toggle("menu--active");
		burger.classList.toggle("burger-close", isActive);
		body.style.overflow = isActive ? "hidden" : "";
	});
	// Lottie
	const lottieAnimations = [{ selector: ".hero__picture", path: "/src/animation/about/about-main.json" }];

	const lottieSettings = {
		renderer: "svg",
		loop: true,
		autoplay: true,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid meet",
			progressiveLoad: true,
			viewBoxOnly: true,
		},
	};

	lottieAnimations.forEach(({ selector, path }) => {
		const container = document.querySelector(selector);
		bodymovin.loadAnimation({
			container,
			path,
			...lottieSettings,
		});
	});

	// Picture Relocate
	function pictureRelocate(breakpointMedia, itemSelector, elemSelector, insertFunc) {
		const mq = window.matchMedia(breakpointMedia),
			items = Array.from(document.querySelectorAll(itemSelector));

		function relocate() {
			items.forEach((item) => {
				const el = item.querySelector(elemSelector);
				if (!el) return;

				if (mq.matches) {
					insertFunc(item, el);
				} else {
					const content = item.querySelector(".hero__content");
					if (content) {
						item.insertBefore(el, content);
					}
				}
			});
		}

		mq.addEventListener("change", relocate);
		relocate();
	}

	pictureRelocate("(max-width: 767.98px)", ".hero__wrapper", ".hero__picture", (container, picture) => {
		const title = container.querySelector(".hero__title");
		if (title) title.parentNode.insertBefore(picture, title.nextSibling);
	});
});
