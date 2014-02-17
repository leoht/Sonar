'use strict';

var isEnablingMultipleBeats = false;
var isContextMenuShowing = false;


var initUI = function () {

    $(window).resize(function () {
        $('.track-element').css('height', $('.track-element').width()-5)
    })

    $(window).resize()

    $('.beat').click(function () {
        if (!clip.paused) return
            
        var sound = $('.clip').attr('data-sound')
        var noteIndex = parseInt($(this).attr('data-note-index'))
        engine.playSound(clip.bufferMap[noteIndex], 0)
    })


    $('.beat').mousedown(function (e) {
        isEnablingMultipleBeats = true;
        $(this).toggleClass('beat-enabled')
    })

    $('.beat').mousemove(function (e) {
        if (isEnablingMultipleBeats) {
            $(this).addClass('beat-enabled')
        }
    })

    $('.beat').mouseup(function (e) {
        isEnablingMultipleBeats = false
    })

    $('.beat').contextmenu(function (e) {
        $(this).removeClass('beat-enabled')
        e.preventDefault()
    })

    
    // $(document).bind("contextmenu", function(event) {
    //     event.preventDefault();

    //     isContextMenuShowing = true;
    //     $("<div class='custom-menu' style='position: absolute; z-index: 50;'>Custom menu</div>")
    //         .appendTo("body")
    //         .click(function (e) {e.stopPropagation()})
    //         .css({top: event.pageY + "px", left: event.pageX + "px"});
    // });

    // $(document).click(function () {
    //     if (isContextMenuShowing) {
    //         $('.custom-menu').hide(0)
    //     }
    // })

    $('.editable-content').keydown(function (e) {
        if (e.which == 13) {
            $(this).blur()
        }
    })

    $('.editable-content').blur(function () {
        console.log('Edited : '+$(this).text())
    })

    $(document).unbind('keydown').keydown(function (e) {
        if (e.which == 32) {
            if (clip.paused) clip.reset()
            else clip.pause()
            e.preventDefault()
        }

        if (e.which == 27) {
            $('.clip').fadeOut(200)
            clip.pause()
        }
    })

    $(window).blur(function () {
        clip.pause()
    })

    $('.track-segment').click(function () {
        $(this).toggleClass('track-segment-enabled')
    })

    
};
