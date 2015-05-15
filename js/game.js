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

    //disable text selection from web page
	$("body").css("-webkit-user-select","none");
	$("body").css("-moz-user-select","none");
	$("body").css("-ms-user-select","none");
	$("body").css("-o-user-select","none");
	$("body").css("user-select","none");

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

    // leaderboard page
    $('#leaderboardBtn').click( function() {
	    $('#leaderboard').show();
        $('#leftArrow2').show();
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
        ion.sound.play("click_button");
        ion.sound.play("gamebg");//new game sound starts
        ion.sound.stop("startbg");
        init();
        drag_drop();
    });

    $('.leftArrow2').click( function() {
	    $('#level_selection').hide();
        $('#leaderboard').hide();
	    $('#start_screen').show();
        ion.sound.play("click_button");
    });













    function drag_drop(){

    $(".drag-digit").draggable({
		revert: function(event,ui){
		    //for jQuery 1.9 version 'uiDraggable' 
		    //for older jQuery 'draggable'
		    $(this).data("uiDraggable").originalPosition={
		    top:0,
		    left:0
		    }; return !event;
		}
	});


		/* droppable function */
		$(".drop-digit").droppable({
				tolerance:'intersect',
			drop: function(event,ui){
				$(this).droppable('option','accept',ui.draggable);
				var drop_p = $(this).offset();
				var drag_p = ui.draggable.offset();
				var left_end = drop_p.left - drag_p.left - 5;
				var top_end = drop_p.top - drag_p.top - 5;
				ui.draggable.animate({
					top: '+=' + top_end,
					left: '+=' + left_end,
				});

				x =ui.draggable.text();
				$(this).attr("value",x);
			},
			out:function(event,ui){
			    $(this).droppable('option','accept','.drag-digit');
                checkInBox();
                checkDrag();
			}
		});

            
        }

        // check if the ball should turn at the fifth box
        function checkInBox(){
            if(obstacle4.style.left >= 20 + 'px' && obstacle4.style.width <=10 + 'px'){
               box5.inBox = 1; 
            }
        }


        function checkDrag(){
            gameOn = true;
        }



        // a basic ball animation test
        // var ballAngle = 90 + 'px';
        var ballWidth = 20 + 'px';
        var ballHeight = 20 + 'px';

        var ballDivWidth = 270 + 'px';
        var ballDivHeight = 350 + 'px';
        var ballDivTop = 90 + 'px';
        var ballDivLeft = 70 + 'px';

        var x = 125 + 'px'; // ball x position
        var y = 300 + 'px'; // ball y position

        var ballDX = 0;
        var ballDY = -5;

        var up = false // determine the coming direction of the ball
        var left = false // determine the coming direction of the ball
        var down = false // determine the coming direction of the ball
        var right = false // determine the coming direction of the ball

        var gameOn = false;

        var box5 = {x: 125, y: 135, inBox: 0};

        var score = 0;

        $('#ball').click( function() {
            if(gameOn){
                timer = setInterval(move, 10);
            }
            ion.sound.play("click_button");
        });


        function init(){
            ballDiv.style.width = ballDivWidth;
            ballDiv.style.height = ballDivHeight;
            ballDiv.style.top = ballDivTop;
            ballDiv.style.left = ballDivLeft;

            ball.style.width = ballWidth;
            ball.style.height = ballHeight;
            ball.style.top = y;
            ball.style.left = x;
        }

        function move(){
            ball.style.top = parseInt(ball.style.top) + ballDY + 'px';
            ball.style.left = parseInt(ball.style.left) + ballDX + 'px';
            if(ball.style.top < 270 + 'px') {
                ballDivHeight = 270 + 'px';
                ballDiv.style.height = ballDivHeight;
                determination();
            }

            function determination(){
                if(ball.style.top <= 0 + 'px'){
                    ballDY = 5;
                }
                if(ball.style.top >= 260 + 'px'){
                    ballDY = -5;
                }
                if(ball.style.top <= box5.y + 'px' && box5.inBox == 1 && ball.style.left == box5.x + 'px'){
                    ballDX = 5;
                    ballDY = 0;
                }
                if(ball.style.top == 135 + 'px' && ball.style.left == 300 + 'px'){
                    ballDX = 0;
                    ballDY = 0;
                    $('#winningScreen').show();
                }
            }
        
        }



});