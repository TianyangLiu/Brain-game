$(function(){				

	//ion.sound js library initialization
	ion.sound({
		sounds: [
	    {
			name:"click_button",
			volume:0.9
		},
	    {
			name:"gamebg",
			volume:0.9
		},
		{
			name:"startbg",
			volume: 0.9,
			loop: 900000,
		},
	    ],
		volume: 0.5,
		path: "sounds/",
		preload: true
	});

		ion.sound.play("startbg");

    // start screen
    $('#playBtn').click( function() {
	    $('#start_screen').hide();
	    $('#level_selection').show();
        ion.sound.play("click_button");
    });


    // instruction page one
    $('#instructionBtn').click( function() {
	    $('#start_screen').hide();
	    $('#instructionOne').show();
        ion.sound.play("click_button");
    });


    // start button on instruction page one
    $('.startGame').click( function() {
	    $('#instructionOne').hide();
	    $('#instructionTwo').hide();
	    $('#instructionThree').hide();
	    $('#level_selection').show();
        ion.sound.play("click_button");
    });


    // right arrow button on instruction page one
    $('#rightArrow1').click( function() {
	    $('#instructionOne').hide();
	    $('#instructionTwo').show();
        ion.sound.play("click_button");
    });


    // right arrow button on instruction page two
    $('#rightArrow2').click( function() {
	    $('#instructionTwo').hide();
	    $('#instructionThree').show();
        ion.sound.play("click_button");
    });

    $('#leftArrow').click( function() {
	    $('#instructionTwo').hide();
	    $('#instructionOne').show();
        ion.sound.play("click_button");
    });


    $('#leftArrow3').click( function() {
	    $('#instructionThree').hide();
	    $('#instructionTwo').show();
        ion.sound.play("click_button");
    });


    // level seletion page to game page
    $('#levelOneBtn').click( function() {
	    $('#level_selection').hide();
	    $('#gameScreen').show();
        level1()
        ion.sound.play("click_button");
        ion.sound.play("gamebg");//new game sound starts
        ion.sound.stop("startbg");
    });

    $('#leftArrow2').click( function() {
	    $('#level_selection').hide();
	    $('#start_screen').show();
        ion.sound.play("click_button");
    });

    function level1(){
        $("#drag").draggable({
            containment: 'document',
            cursor: 'pointer',
            opacity: 1.5,
			revert: function(event,ui){
				//for jQuery 1.9 version 'uiDraggable' 
				//for older jQuery 'draggable'
			    $(this).data("uiDraggable").originalPosition={
			       	top:200+"px",
			       	left:20+"px",
			    }; return !event;	
			}
		});

        $("#drop").droppable({
            hoverClass: 'border',
	        tolerance:'intersect',
		    drop: function(event,ui){  
		    //$(this).droppable('option','accept',ui.draggable);
		    var drop_p = $(this).offset();
		    var drag_p = ui.draggable.offset();
		    var left_end = drop_p.left - drag_p.left - 17;
		    var top_end = drop_p.top - drag_p.top - 17;
		    ui.draggable.animate({
			    top: '+=' + top_end,
			    left: '+=' + left_end,
            });

		    //play sound after placing
		    //ion.sound.play("got_item");	

		    x =ui.draggable.text();
		    $(this).attr("value",x);
	        },
		    //out:function(event,ui){
		    //$(this).droppable('option','accept','.drag-digit');
		    //}
	    });
    }

});