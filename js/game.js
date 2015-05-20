$(function () {

    //ion.sound js library initialization
    ion.sound({
        sounds: [
	    {
	        name: "click_button",
	        volume: 0.9
	    },
	    {
	        name: "gamebg",
	        volume: 0.9
	    },
		{
		    name: "startbg",
		    volume: 0.9,
		    loop: 900000
		},
	    ],
        volume: 0.5,
        path: "sounds/",
        preload: true
    });

    ion.sound.play("startbg");

    //disable text selection from web page
    $("body").css("-webkit-user-select", "none");
    $("body").css("-moz-user-select", "none");
    $("body").css("-ms-user-select", "none");
    $("body").css("-o-user-select", "none");
    $("body").css("user-select", "none");

    // start screen
    $('#playBtn').click(function () {
        $('#start_screen').hide();
        $('#level_selection').show();
        ion.sound.play("click_button");
    });


    // instruction page one
    $('#instructionBtn').click(function () {
        $('#start_screen').hide();
        $('#instructionOne').show();
        ion.sound.play("click_button");
    });

    // leaderboard page
    $('#leaderboardBtn').click(function () {
        $('#leaderboard').show();
        $('#leftArrow2').show();
        ion.sound.play("click_button");
    });


    // start button on instruction page one
    $('.startGame').click(function () {
        $('#instructionOne').hide();
        $('#instructionTwo').hide();
        $('#instructionThree').hide();
        $('#level_selection').show();
        ion.sound.play("click_button");
    });


    // right arrow button on instruction page one
    $('#rightArrow1').click(function () {
        $('#instructionOne').hide();
        $('#instructionTwo').show();
        ion.sound.play("click_button");
    });


    // right arrow button on instruction page two
    $('#rightArrow2').click(function () {
        $('#instructionTwo').hide();
        $('#instructionThree').show();
        ion.sound.play("click_button");
    });

    $('#leftArrow').click(function () {
        $('#instructionTwo').hide();
        $('#instructionOne').show();
        ion.sound.play("click_button");
    });


    $('#leftArrow3').click(function () {
        $('#instructionThree').hide();
        $('#instructionTwo').show();
        ion.sound.play("click_button");
    });


    // level seletion page to game page
    $('#levelOneBtn').click(function () {
        $('#level_selection').hide();
        $('#gameScreen').show();
        ion.sound.play("click_button");
        ion.sound.play("gamebg"); //new game sound starts
        ion.sound.stop("startbg");
        level1();
    });

    $('.leftArrow2').click(function () {
        $('#level_selection').hide();
        $('#leaderboard').hide();
        $('#start_screen').show();
        ion.sound.play("click_button");
    });



    var ballWidth = 15 + 'px';
    var ballHeight = 15 + 'px';

    //var ballDivWidth = 15 + 'px';
    //var ballDivHeight = 15 + 'px';
    var ballDivTop = 380 + 'px';
    var ballDivLeft = 200 + 'px';

    var ballDX = 0;
    var ballDY = -5;

    var up = false // determine the coming direction of the ball
    var left = false // determine the coming direction of the ball
    var down = false // determine the coming direction of the ball
    var right = false // determine the coming direction of the ball

    var gameOn = false;

    var box5 = { x: 200, y: 230, inBox: null };

    var o1 = false;
    var o5 = false;






    // level one game setting start here
    function level1() {
        init();
        drag_drop();
        //start();
        startCounter(); // timer start

        function drag_drop() {
            $(".drag-digit").draggable({
                revert: function (event, ui) {
                    //for jQuery 1.9 version 'uiDraggable' 
                    //for older jQuery 'draggable'
                    $(this).data("uiDraggable").originalPosition = {
                        top: 0,
                        left: 0
                    }; return !event;
                }
            });

            /* droppable function */
            $(".drop-digit").droppable({
                tolerance: 'intersect',
                hoverClass: 'borderColorChange',
                drop: function (event, ui) {
                    $(this).droppable('option', 'accept', ui.draggable);
                    var drop_p = $(this).offset();
                    var drag_p = ui.draggable.offset();
                    var left_end = drop_p.left - drag_p.left + 15;
                    var top_end = drop_p.top - drag_p.top + 15;
                    ui.draggable.animate({
                        top: '+=' + top_end,
                        left: '+=' + left_end
                    });

                    x = ui.draggable.text();
                    $(this).attr("value", x);

                    checkInBox5();
                    gameOn = true;
                },
                out: function (event, ui) {
                    $(this).droppable('option', 'accept', '.drag-digit');
                }
            });
        }

        // check if the ball should turn at the fifth box
        function checkInBox5() {
            if (obstacle4.style.left >= 165 + 'px' && obstacle4.style.left <= 245 + 'px' && obstacle4.style.top >= 190 + 'px' && obstacle4.style.top <= 270 + 'px') {
                box5.inBox = 'o5InBox';
                o5 = true;
            } else if (obstacle1.style.left >= 165 + 'px' && obstacle1.style.left <= 245 + 'px' && obstacle1.style.top >= 190 + 'px' && obstacle1.style.top <= 270 + 'px') {
                box5.inBox = 'o1InBox';
                o1 = true;
            }
        }

        $('#ballDiv').click(function () {
            if (gameOn == true) {
                setInterval(move, 10);
            }
            ion.sound.play("click_button");
        });


        function init() {
            ballDiv.style.top = ballDivTop;
            ballDiv.style.left = ballDivLeft;

            ball.style.width = ballWidth;
            ball.style.height = ballHeight;
        }

        function move() {
            ballDiv.style.top = parseInt(ballDiv.style.top) + ballDY + 'px';
            ballDiv.style.left = parseInt(ballDiv.style.left) + ballDX + 'px';

            if (ballDiv.style.top <= 360 + 'px') {
                determination();
            }

            // when the ball hit any wall or obstacle, the heading direction of the ball would change
            function determination() {
                if (ballDiv.style.top <= 100 + 'px') {
                    ballDX = 0;
                    ballDY = 5;
                    HitWall.play();
                } else if (ballDiv.style.top >= 340 + 'px') {
                    ballDX = 0;
                    ballDY = -5;
                    HitWall.play();
                } else if (box5.inBox == 'o5InBox' && o5 == true && ballDiv.style.top == box5.y + 'px' && ballDiv.style.left == box5.x + 'px') {
                    ballDX = 5;
                    ballDY = 0;
                    HitStone.play();
                } else if (box5.inBox == 'o1InBox' && o1 == true && ballDiv.style.top == box5.y + 'px' && ballDiv.style.left == box5.x + 'px') {
                    ballDX = -5;
                    ballDY = 0;
                    HitStone.play();
                } else if (ballDiv.style.top == 230 + 'px' && ballDiv.style.left == 350 + 'px') {
                    clearInterval(move);
                    ballDX = 0;
                    ballDY = 0;
                    $('#winningScreen').show();
                    //stoptime();
                    stopCounter();
                }
            }
        }

        $('#submit').click(function () {
            $('#win').hide();
            $('#formContainer').hide();
            $('#leaderboard').show();
        });

    } // level one game ends here

});