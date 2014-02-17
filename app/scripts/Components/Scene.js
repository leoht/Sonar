'use strict';

function Scene () {
    this.tracks = []
    this.tempo = 128
}

Scene.prototype.play = function() {
	for (var i = 0 ; i < this.tracks.length ; i++) {
		this.tracks[i].play()
	}
};

Scene.prototype.addTrack = function() {
    
    var track = new Track()
    this.tracks.push(track)
    trackCount++
    $('.scene-grid').append(track.render())
};

Scene.prototype.pause = function() {
	
};

Scene.prototype.reset = function() {
	// body...
};

Scene.prototype.render = function() {
    
};