'use strict';

function Track () {
	this.soundName = null
	this.clipMap = []
	this.clipTimers = []
	this.paused = true
}

Track.prototype.addClipAt = function(bar, clip) {
	this.clipMap[bar] = clip
};

Track.prototype.play = function() {

	var eighthNoteTime = (60 / mainScene.tempo) / 2;

	for (var bar in this.clipMap) {
		var clip = this.clipMap[bar]
		this.clipTimers.push(setTimeout(function () {

			clip.play()

		}.bind(this), bar*clip.durationInSteps*eighthNoteTime))
	}
};

Track.prototype.pause = function() {
	this.paused = true

	for (var i = 0 ; i < this.clipTimers.length ; i++) {
		clearInterval(this.clipTimers[i])
	}

	this.clipTimers = []
};


Track.prototype.render = function() {
	
	var root = $('<div class="scene-track"></div>')

	
};