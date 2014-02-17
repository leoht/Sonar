'use strict';

var trackCount = 1

function Track () {
	this.trackIndex = trackCount-1
	this.soundName = null
	this.clipMap = []
	this.clipTimers = []
	this.paused = true

	this.sizeInSegments = 14
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
	
	var root = $('<div class="scene-track scene-track-'+this.trackIndex+'">')

	var trackSourceOptions = ''

	for (var sound in BUFFER_RESOURCES_LIST) {
		trackSourceOptions += '<option value="'+sound+'">'+BUFFER_RESOURCES_LABELS[sound]+'</option>'
	}

	root.append('<div class="track-head"><div class="track-head-title editable-content" contenteditable>Track 1</div><div class="track-head-color"></div><div class="track-source"><select class="track-source-selection">'+trackSourceOptions+'</select></div></div>')

	var html = '<div class="track-slot-wrapper"><div class="track-slot" style="width: '+(this.sizeInSegments*100)+'px;">'

	for (var i = 0 ; i < this.sizeInSegments ; i++) {
		html += '<div class="track-segment" title="Click to insert a new clip here"></div>'
	}

	html += '</div></div>'

	root.append(html)

	return root
};