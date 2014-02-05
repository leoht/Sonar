'use strict'

function Clip (soundName) {
	this.name = "Untitled Clip"
	
	this.rowMap = []
	this.durationInSteps = 16
	this.engine = engine
	this.bufferMap = bufferList[soundName]

	this.timelineTimer = null
	this.stepTimers = []
	this.numberOfBarsToPlay = 4

	this.currentHighlightedBeat = 0
	this.currentBeat = 1

	this.paused = true

	for (var i = 0 ; i < 24 ; i++) {
		this.rowMap.push(new Row(i))
	}

	console.log(this.bufferMap)
};

Clip.prototype.setSoundName = function(soundName) {
	this.bufferMap = bufferList[soundName]
};

Clip.prototype.render = function () {

	var root = $('<div class="clip"></div>')
	var grid = $('<div class="clip-grid"></div>')

	$(root).append(this.renderTitleBar())

	for (var i = 0 ; i < this.rowMap.length ; i++) {
		$(grid).append(this.rowMap[i].render())
	}

	$(root).append(grid)

	return root;
};

Clip.prototype.renderTitleBar = function() {
	var html = '<div class="clip-title-bar unselectable">';
	html +=	   '<span class="clip-title editable-content" contenteditable>'+this.name+'</span>'
	html +=	   '</div>'
	return $(html)
};

Clip.prototype.play = function() {

	this.paused = false

    eighthNoteTime = (60 / mainScene.tempo) / 2;

    this.timelineTimer = setInterval(function () {
        this.currentHighlightedBeat++

        $('.track .beat').css('opacity', 1)
        $('.track .beat-'+this.currentHighlightedBeat).css('opacity', 0.5)

        if (this.currentHighlightedBeat == this.durationInSteps) this.currentHighlightedBeat = 0

    }.bind(this), eighthNoteTime*1000);


          for (var beat = 1 ; beat <= this.durationInSteps ; beat++) {

                this.stepTimers.push(setTimeout(function () {

	                	// play all rows of clip
	          			for (var i = 0 ; i < this.rowMap.length ; i++) {
	          				this.currentBuffer = this.bufferMap[i]
		                	if ($('.track-'+i+' .beat-'+this.currentBeat+'').hasClass('beat-enabled')) {
			                	engine.playSound(this.currentBuffer, 0);
			                }
			             }

	                	this.currentBeat++

	                	console.log(this.currentBeat)

	                	if (this.currentBeat == this.durationInSteps+1) {
	                		this.reset()
	                	}
	                }.bind(this),
	                (beat * eighthNoteTime) * 1000)
                )
	                	
          }

};

Clip.prototype.pause = function() {
	this.paused = true

	for (var i = 0 ; i < this.stepTimers.length ; i++) {
		clearInterval(this.stepTimers[i])
	}

	this.stepTimers = []

	clearInterval(this.timelineTimer)
};

Clip.prototype.reset = function() {
	this.pause()
	this.currentBeat = 1
	this.currentHighlightedBeat = 0
	this.play()
};