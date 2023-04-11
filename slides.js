function slidesActivated() {
	return new URLSearchParams(window.location.search).get("slides") !== null;
}

function initializeSlides() {
	document.body.classList.add("slides");
	let main = document.querySelector("main");
	// main.classList.add("show-slides");
	main.querySelectorAll("main > section").forEach((e, i) => {
		initializeSlide(e, i);
	});
	main.addEventListener("scroll", (event) => {
		console.log(event);
	})
}

function initializeSlide(slide, index) {
	slide.setAttribute("data-slide-nr", index);
	slide.id = slide.id || `s${index}`;

	let heading = slide.querySelector("h1, h2, h3, h4, h5, h6");
	heading.id = heading.id || `s${index}h`;

	slide.setAttribute("aria-describedby", heading.id);
}

if (slidesActivated()) {
	initializeSlides();
}
