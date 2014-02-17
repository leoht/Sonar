'use strict'

var notesMap = [
	'A3', 'Ash3', 'B3', 'C3', 'Csh3', 'D3', 'Dsh3', 'E3', 'F3', 'Fsh3', 'G3', 'Gsh3',
	'A4', 'Ash4', 'B4', 'C4', 'Csh4', 'D4', 'Dsh4', 'E4', 'F4', 'Fsh4', 'G4', 'Gsh4'
]

var notesLabelsMap = [
	'A3', 'A#3', 'B3', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3',
	'A4', 'A#4', 'B4', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4'
]

notesMap.reverse()
notesLabelsMap.reverse()

function Row (_noteIndex) {
	this.stepMap = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	this.noteIndex = _noteIndex
}

Row.prototype.addStepAt = function (beat) {
	this.stepMap[beat] = 1
}

Row.prototype.render = function () {

	var root = $('<div class="track track-'+this.noteIndex+'"></div>')

	$(root).append(' <div class="track-element source-chooser unselectable"><span>'+notesLabelsMap[this.noteIndex]+'</span></div>')

	for(var i = 1 ; i <= this.stepMap.length ; i++) {
		$(root).append('<div class="track-element beat beat-'+i+'" data-note-index="'+this.noteIndex+'">')
	}
 	
 	$(root).append('<div class="track-element last-of-track"></div>')

 	return root
}
