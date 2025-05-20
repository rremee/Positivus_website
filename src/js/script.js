import "/src/sass/style.scss";

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

	// Logo Img Spinning
	const logo = document.querySelector(".header__logo"),
		logoImg = logo.querySelector("img"),
		[logoAnimation] = logoImg.getAnimations();

	logo.addEventListener("mouseover", () => {
		logoAnimation.playbackRate = 4;
	});

	logo.addEventListener("mouseout", () => {
		logoAnimation.playbackRate = 1;
	});

	// Picture Relocate
	function pictureRelocate(
		breakpointMedia,
		itemSelector,
		elemSelector,
		insertFunc
	) {
		const mq = window.matchMedia(breakpointMedia),
			items = Array.from(document.querySelectorAll(itemSelector));

		function relocate() {
			items.forEach((item) => {
				const el = item.querySelector(elemSelector);
				if (!el) return;

				if (mq.matches) {
					insertFunc(item, el);
				} else {
					item.appendChild(el);
				}
			});
		}

		mq.addEventListener("change", relocate);
		relocate();
	}

	pictureRelocate(
		"(max-width: 1199.98px)",
		".item-services",
		".item-services__picture",
		(item, picture) => {
			const title = item.querySelector(".item-services__title");
			if (title && picture) {
				title.parentNode.insertBefore(picture, title.nextSibling);
			}
		}
	);

	pictureRelocate(
		"(max-width: 767.98px)",
		".hero__container",
		".hero__picture",
		(container, picture) => {
			const title = container.querySelector(".hero__title");
			if (title) title.parentNode.insertBefore(picture, title.nextSibling);
		}
	);

	// Lottie
	const lottieAnimations = [
		{ selector: ".hero__picture", path: "/src/animation/hero/hero-img.json" },
	];

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
});
