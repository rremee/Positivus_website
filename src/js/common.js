import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "/src/sass/style.scss";

import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
Swiper.use([Navigation, Pagination]);

// Burger
export function initBurger() {
	const burger = document.querySelector(".burger");
	const menu = document.querySelector(".menu");
	const body = document.body;
	if (!burger || !menu) return;

	burger.addEventListener("click", () => {
		const isActive = menu.classList.toggle("menu--active");
		burger.classList.toggle("burger-close", isActive);
		body.style.overflow = isActive ? "hidden" : "";
	});
}

// Logo Spinning
export function initLogoSpinning() {
	const logos = document.querySelectorAll(".logo");
	if (!logos.length) return;

	logos.forEach((logo) => {
		const logoImg = logo.querySelector("img");
		if (!logoImg) return;

		const [logoAnimation] = logoImg.getAnimations();
		if (!logoAnimation) return;

		logo.addEventListener("mouseover", () => {
			logoAnimation.playbackRate = 4;
		});
		logo.addEventListener("mouseout", () => {
			logoAnimation.playbackRate = 1;
		});
	});
}

// Picture Relocate
export function pictureRelocate(breakpointMedia, itemSelector, elemSelector, onMatch, onUnmatch) {
	const mq = window.matchMedia(breakpointMedia);
	const records = Array.from(document.querySelectorAll(itemSelector))
		.map((item) => {
			const el = item.querySelector(elemSelector);
			if (!el) return null;
			return {
				item,
				el,
				originalParent: el.parentNode,
				originalNextSibling: el.nextSibling,
			};
		})
		.filter(Boolean);

	function relocate() {
		records.forEach(({ item, el, originalParent, originalNextSibling }) => {
			if (mq.matches) {
				onMatch(item, el);
			} else if (typeof onUnmatch === "function") {
				onUnmatch(item, el);
			} else {
				if (originalNextSibling && originalNextSibling.parentNode === originalParent) {
					originalParent.insertBefore(el, originalNextSibling);
				} else {
					originalParent.appendChild(el);
				}
			}
		});
	}

	mq.addEventListener("change", relocate);
	relocate();
}

// Lottie Animations
export function initLottieAnimations(arrAnimations) {
	const body = document.body;
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

	arrAnimations.forEach(({ selector, path }) => {
		const container = document.querySelector(selector);
		if (!container) return;
		bodymovin.loadAnimation({
			container,
			path,
			...lottieSettings,
		});
	});
}

// Case Sliding
export function initCaseSliding() {
	const caseWrapper = document.querySelector(".case__wrapper");
	const caseContainer = document.querySelector(".case__container");
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
		if (!last) return;
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
}

// Accordion
export function initProcessAccordion() {
	const processWrapper = document.querySelector(".process__wrapper");
	if (!processWrapper) return;

	processWrapper.addEventListener("click", (e) => {
		const btn = e.target.closest(".item-process");
		if (!btn) return;
		const content = btn.querySelector(".item-process__content");
		if (!content) return;

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
}

// Swiper
export function initTestimonialsSwiper() {
	const swiper = new Swiper(".testimonials-slider", {
		loop: true,
		speed: 500,
		breakpoints: {
			0: { slidesPerView: 1 },
			768: { slidesPerView: 1.8 },
		},
		centeredSlides: true,
		spaceBetween: 50,
		navigation: {
			nextEl: ".testimonials-next",
			prevEl: ".testimonials-prev",
		},
		pagination: {
			el: ".testimonials-pagination",
			clickable: true,
			renderBullet: function (index, className) {
				return `<span class="${className} icon-logo"></span>`;
			},
		},
	});
}

// Form
export function initContactFormTabs() {
	const radios = document.querySelectorAll(".contact__toggle-input");
	if (!radios.length) return;

	const formSayHi = document.getElementById("form-sayHi");
	const formGetQuote = document.getElementById("form-getQuote");
	const radioLabels = document.querySelectorAll(".contact__toggle [role=radio]");

	radios.forEach((radio) => {
		radio.addEventListener("change", () => {
			const showSayHi = radio.value === "sayHi";
			if (formSayHi) formSayHi.hidden = !showSayHi;
			if (formGetQuote) formGetQuote.hidden = showSayHi;

			radioLabels.forEach((label) => {
				const input = label.querySelector("input");
				const checked = input.checked;
				label.setAttribute("aria-checked", checked);
				label.setAttribute("tabindex", checked ? "0" : "-1");
			});
		});
	});

	radios.forEach((radio) => {
		if (radio.checked) radio.classList.add("is-checked");
		radio.addEventListener("change", () => {
			radios.forEach((r) => {
				if (r.checked) r.classList.add("is-checked");
				else r.classList.remove("is-checked");
			});
		});
	});
}
