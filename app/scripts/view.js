'use strict';

var isEnablingMultipleBeats = false;
var isContextMenuShowing = false;


var initUI = function () {

    $(window).resize(function () {
        $('.track-element').css('height', $('.track-element').width()-5)
        $('.track-head,  .slot').css('height', $('.track-head').width()/2)
    })

    $(window).resize()

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

     $('.beat-note').click(function (e) {
        $(this).toggleClass('enabled')

        if ($(this).parent().hasClass('beat-enabled')) {
            e.stopPropagation() // avoid propagation that would disable the master beat
        }
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
        }
    })

    $(window).blur(function () {
        clip.pause()
    })


};
