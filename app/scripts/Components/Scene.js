'use strict';

function Scene () {
    this.tracks = []
    this.tempo = 128
}

Scene.prototype.play = function() {
	for (var i = 0 ; i < tracks.length ; i++) {
		this.tracks[i].play()
	}
};

Scene.prototype.pause = function() {
	
};

Scene.prototype.reset = function() {
	// body...
};