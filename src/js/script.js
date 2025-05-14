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
        logoImg = logo.querySelector('img'),
        [logoAnimation] = logoImg.getAnimations();

    logo.addEventListener("mouseover", () => {
        logoAnimation.playbackRate = 4;
    });

    logo.addEventListener("mouseout", () => {
        logoAnimation.playbackRate = 1;
    });
});
