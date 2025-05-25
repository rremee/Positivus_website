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
					item.appendChild(el);
				}
			});
		}

		mq.addEventListener("change", relocate);
		relocate();
	}

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

	// Lottie
	const lottieAnimations = [
		{ selector: ".hero__picture", path: "/src/animation/hero/hero-img.json" },
		{ selector: ".cta__picture", path: "/src/animation/cta/cta.json" },
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

	// Case Item Sliding

	const caseWrapper = document.querySelector(".case__wrapper"),
		caseContainer = document.querySelector(".case__container");
	if (!caseWrapper || !caseContainer) return;

	let isDown = false;
	let startX = 0;
	let baseT = 0;
	let minT = 0;
	const maxT = 0;

	function calcLimits() {
		const cw = caseContainer.clientWidth;
		const contLeft = caseContainer.getBoundingClientRect().left;
		const last = caseWrapper.querySelector(".case__item:last-child");
		const lastRight = last.getBoundingClientRect().right;
		const contentEnd = lastRight - contLeft;
		minT = cw - contentEnd;
		baseT = Math.max(minT, Math.min(baseT, maxT));
		caseWrapper.style.transform = `translateX(${baseT}px)`;
	}

	function enableDrag() {
		caseWrapper.style.cursor = "grab";
		calcLimits();
	}

	function disableDrag() {
		isDown = false;
		caseWrapper.style.cursor = "";
		caseWrapper.style.transform = "";
	}

	function onResize() {
		if (window.innerWidth <= 1023) enableDrag();
		else disableDrag();
	}

	window.addEventListener("resize", onResize);
	onResize();

	function pointerX(e) {
		return e.touches ? e.touches[0].pageX : e.pageX;
	}

	caseWrapper.addEventListener("mousedown", (e) => {
		if (window.innerWidth > 1023) return;
		isDown = true;
		startX = pointerX(e);
		caseWrapper.style.cursor = "grabbing";
	});

	caseWrapper.addEventListener("touchstart", (e) => {
		if (window.innerWidth > 1023) return;
		isDown = true;
		startX = pointerX(e);
	});

	document.addEventListener("mousemove", (e) => {
		if (!isDown || window.innerWidth > 1023) return;
		const delta = e.pageX - startX;
		let t = baseT + delta;
		t = Math.max(minT, Math.min(t, maxT));
		caseWrapper.style.transform = `translateX(${t}px)`;
	});

	document.addEventListener("touchmove", (e) => {
		if (!isDown || window.innerWidth > 1023) return;
		const delta = pointerX(e) - startX;
		let t = baseT + delta;
		t = Math.max(minT, Math.min(t, maxT));
		caseWrapper.style.transform = `translateX(${t}px)`;
	});

	document.addEventListener("mouseup", () => {
		if (!isDown) return;
		isDown = false;
		caseWrapper.style.cursor = "grab";
		baseT = new DOMMatrixReadOnly(getComputedStyle(caseWrapper).transform).m41;
	});

	caseWrapper.addEventListener("touchend", () => {
		if (!isDown) return;
		isDown = false;
		baseT = new DOMMatrixReadOnly(getComputedStyle(caseWrapper).transform).m41;
	});

	// Process Accordion
	const processWrapper = document.querySelector(".process__wrapper");

	processWrapper.addEventListener("click", (e) => {
		const btn = e.target.closest(".item-process");
		if (!btn) return;
		const content = btn.querySelector(".item-process__content");

		content.style.transition = "none";
		const currentH = content.getBoundingClientRect().height;
		content.style.height = `${currentH}px`;
		requestAnimationFrame(() => {
			content.style.transition = "height 0.4s ease-in-out";

			if (btn.classList.contains("item-process--active")) {
				content.style.height = "0";
				btn.classList.remove("item-process--active");
			} else {
				const fullH = content.scrollHeight;
				btn.classList.add("item-process--active");
				content.style.height = `${fullH}px`;
			}
			content.addEventListener(
				"transitionend",
				function cb(ev) {
					if (ev.propertyName === "height" && btn.classList.contains("item-process--active")) {
						content.style.height = "auto";
					}
				},
				{ once: true }
			);
		});
	});
});
