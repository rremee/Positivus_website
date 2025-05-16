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

	// Relocate Hero Picture
	const heroContainer = document.querySelector(".hero__container"),
		mediaTabletResponsive = window.matchMedia("(max-width: 767.98px"),
		heroContent = document.querySelector(".hero__content"),
		heroPicture = document.querySelector(".hero__picture");

	function pictureRelocate() {
		if (mediaTabletResponsive.matches) {
			const heroTitle = heroContent.querySelector(".hero__title");
			heroContent.insertBefore(heroPicture, heroTitle.nextSibling);
		} else {
			heroContainer.appendChild(heroPicture);
		}
	}

	mediaTabletResponsive.addEventListener("change", pictureRelocate);

	pictureRelocate();

	// Lottie
	const lottieAnimation = bodymovin.loadAnimation({
		container: document.querySelector(".hero__picture"),
		renderer: "svg",
		loop: true,
		autoplay: true,
		path: "/src/animation/hero/hero-img.json",
		rendererSettings: {
			preserveAspectRatio: "xMidYMid meet",
			progressiveLoad: true
		},
	});
});
