function SlideShow(slides, options) {

	var settings = $.extend({}, SlideShow.defaults, options),
		len = slides.length,
		currentIndex = 0, 
		autoplay = true;

	/**
	 * Go to the specified slide, or to the next one
	 */
	function displaySlide(index, options) {

		if (typeof index === "string" && index === "last") {
			currentIndex = len - 1;

		} else if (typeof index === "string" && index === "fist") {
			currentIndex = 0;

		} else if (index === undefined || index < 0 || index >= len) {
			// invalid value > auto play
			currentIndex = (currentIndex + 1) % len;

		} else {
			currentIndex = index;
		}

		return $.onScreen(slides[currentIndex], options);
	}


	/**
	 * Program next slide
	 */
	function nextTransition(slide) {
		displaySlide.future = (autoplay) ? setTimeout(function () {
			requestAnimationFrame(displaySlide);
		}, settings.duration) : 0;
	}

	function stop() {
		autoplay = false;
		clearTimeout(displaySlide.future);
	}
	function play() {
		autoplay = true;
		displaySlide();
	}
	function next(evt) {
		stop();
		displaySlide(currentIndex + 1);
		if (evt) evt.preventDefault();
	}
	function previous(evt) {
		stop();
		displaySlide(currentIndex ? currentIndex - 1 : len - 1);
		if (evt) evt.preventDefault();
	}

	function playPause() {
		(autoplay) ? stop() : play();
	}

	// Keyboard Handler
	$(document).on("keydown", function (evt) {
		switch (evt.keyCode) {
			case 37: // LEFT
				previous();
				break;
			case 39: // RIGHT
				next();
				break;
			case 32: // SPACE
				playPause();
		}
	});

	$.onScreen("settings", settings); // this first call just sets the defaults settings


	return { // return the interface
		stop: stop,
		play: play,
		playPause: playPause,
		displaySlide: displaySlide,
		previous: previous,
		next: next
	}
}

SlideShow.defaults = {
	duration: 4000,
	speed: 1500,
	videoPlayer: {
		bgcolor: "black",
		width: 960,
		height: 540,
		autoplay: 1,
		color: "111"
	}
};
