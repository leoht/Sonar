'use strict';

var bufferList = []

function SoundEngine () {
	this.context = null
	this.bufferLoader = null
	this.bufferSoundsLoaded = 0
	this.bufferSoundsTotal = 0
}

SoundEngine.prototype.init = function() {

    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext
        this.context = new AudioContext()
    } catch (e) {
        alert('WebAudio API not supported !')
    }

    var bufferLoadingList = [];

    console.log('Loading sounds...')

    for (var sound in BUFFER_RESOURCES_LIST) {

    	this.bufferSoundsTotal++

    	this.bufferLoader = new BufferLoader(
	        this.context,
	        BUFFER_RESOURCES_LIST[sound],
	        function (list) {
	        	console.log(list)

	        	bufferList[sound] = list;

	        	this.onBufferPartiallyLoaded();

	        }.bind(this)
	    )

	    this.bufferLoader.load()
    }

    
};

SoundEngine.prototype.playSound = function (buffer, time) {

    var source = this.context.createBufferSource();
    source.buffer = buffer;

    source.connect(this.context.destination);

    if (!source.start)
      source.start = source.noteOn;
    source.start(time);
}

SoundEngine.prototype.onBufferPartiallyLoaded = function () {
	this.bufferSoundsLoaded++

	if (this.bufferSoundsLoaded == this.bufferSoundsTotal) {
        console.log('Done !')
		onBufferLoaded();
	}
}