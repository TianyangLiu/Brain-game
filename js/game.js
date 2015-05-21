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


    // level selection page to game page
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

    //pause button functions
    $("#pause_button").click(function () {
        // if timerCount has an interval, stop the timer and clear the interval; otherwise, start a new interval
        if (timerCount) {
            stopCounter();
        } else {
            startCounter();
        }
    })

    var ballWidth = 20 + 'px';
    var ballHeight = 20 + 'px';

    //var ballDivWidth = 15 + 'px';
    //var ballDivHeight = 15 + 'px';
    var ballDivTop = 400 + 'px';
    var ballDivLeft = 200 + 'px';

    var ballDX = 0;
    var ballDY = -5;

    var up = false // determine the heading direction of the ball
    var left = false // determine the heading direction of the ball
    var down = false // determine the heading direction of the ball
    var right = false // determine the heading direction of the ball

    var gameOn = false;

    var box1 = { x: 120, y: 140, inBox: null, o1: false, o2: false };
    var box2 = { x: 200, y: 140, inBox: null, o1: false, o2: false };
    var box4 = { x: 120, y: 225, inBox: null, o1: false, o2: false };
    var box5 = { x: 200, y: 225, inBox: null, o1: false, o2: false };
    var box8 = { x: 200, y: 310, inBox: null, o1: false, o2: false };

    // level one game setting start here
    function level1() {
        init();
        drag_drop();
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
                    var top_end = drop_p.top - drag_p.top + 20;
                    ui.draggable.animate({
                        top: '+=' + top_end,
                        left: '+=' + left_end
                    });

                    x = ui.draggable.text();
                    $(this).attr("value", x);

                    checkInBox();
                    gameOn = true;
                },
                out: function (event, ui) {
                    $(this).droppable('option', 'accept', '.drag-digit');
                }
            });
        }

        // check if the ball should turn at the fifth box
        function checkInBox() {
            // obstacle in the 1st tile
            if (obstacle1.style.left > 75 + 'px' && obstacle1.style.left < 160 + 'px' && obstacle1.style.top > 100 + 'px' && obstacle1.style.top < 185 + 'px') {
                box1.inBox = 'o1InBox';
                box1.o1 = true;
            }
            if (obstacle2.style.left > 75 + 'px' && obstacle2.style.left < 160 + 'px' && obstacle2.style.top > 100 + 'px' && obstacle2.style.top < 185 + 'px') {
                box1.inBox = 'o2InBox';
                box1.o2 = true;
            }

            // obstacle in the 2nd tile
            if (obstacle1.style.left > 165 + 'px' && obstacle1.style.left < 245 + 'px' && obstacle1.style.top > 105 + 'px' && obstacle1.style.top < 185 + 'px') {
                box2.inBox = 'o1InBox';
                box2.o1 = true;
            }
            if (obstacle2.style.left > 165 + 'px' && obstacle2.style.left < 245 + 'px' && obstacle2.style.top > 105 + 'px' && obstacle2.style.top < 185 + 'px') {
                box2.inBox = 'o2InBox';
                box2.o2 = true;
            }

            // obstacle in the 4nd tile
            if (obstacle1.style.left > 80 + 'px' && obstacle1.style.left < 170 + 'px' && obstacle1.style.top > 190 + 'px' && obstacle1.style.top < 270 + 'px') {
                box4.inBox = 'o1InBox';
                box4.o1 = true;
            }
            if (obstacle2.style.left > 80 + 'px' && obstacle2.style.left < 170 + 'px' && obstacle2.style.top > 190 + 'px' && obstacle2.style.top < 270 + 'px') {
                box4.inBox = 'o2InBox';
                box4.o2 = true;
            }

            // obstacle in the 5th tile
            if (obstacle1.style.left > 165 + 'px' && obstacle1.style.left < 245 + 'px' && obstacle1.style.top > 190 + 'px' && obstacle1.style.top < 270 + 'px') {
                box5.inBox = 'o1InBox';
                box5.o1 = true;
            }
            if (obstacle2.style.left > 165 + 'px' && obstacle2.style.left < 245 + 'px' && obstacle2.style.top > 190 + 'px' && obstacle2.style.top < 270 + 'px') {
                box5.inBox = 'o2InBox';
                box5.o2 = true;
            }

            // obstacle in the 8th tile
            if (obstacle1.style.left > 165 + 'px' && obstacle1.style.left < 245 + 'px' && obstacle1.style.top > 275 + 'px' && obstacle1.style.top < 360 + 'px') {
                box8.inBox = 'o1InBox';
                box8.o1 = true;
            }
            if (obstacle2.style.left > 165 + 'px' && obstacle2.style.left < 245 + 'px' && obstacle2.style.top > 275 + 'px' && obstacle2.style.top < 360 + 'px') {
                box8.inBox = 'o2InBox';
                box8.o2 = true;
            }
        }


        // when the ball is clicked, the ball will start moving. This is done because the timer method
        $('#ballDiv').click(function () {
            if (gameOn == true) {
                setInterval(move, 10); // timer
            }
            ion.sound.play("click_button");
        });


        function init() {
            ballDiv.style.top = ballDivTop;
            ballDiv.style.left = ballDivLeft;

            ball.style.width = ballWidth;
            ball.style.height = ballHeight;
        }


        // this function will run every 10ms, and the ball will move some pixels every 10ms
        function move() {
            ballDiv.style.top = parseInt(ballDiv.style.top) + ballDY + 'px';
            ballDiv.style.left = parseInt(ballDiv.style.left) + ballDX + 'px';
            detectInTile();
        }

        function detectInTile() {
            if (ballDiv.style.top < parseInt(360) + 'px') {
                direction();

            }
        }


        // dectect which direction that the bal is currently heading to, and based on that, the ball will response differently when it hit a wall or an obstacle
        function direction() {
            if (ballDX == 0 && ballDY == -5) {
                up = true;
            } else {
                up = false;
            }
            if (ballDX == 0 && ballDY == 5) {
                down = true;
            } else {
                down = false;
            }
            if (ballDX == 5 && ballDY == 0) {
                right = true;
            } else {
                right = false;
            }
            if (ballDX == -5 && ballDY == 0) {
                left = true;
            } else {
                left = false;
            }
            collision();
        }

        // when the ball hit any wall or obstacle, the heading direction of the ball would change
        function collision() {
            // boundaries detection
            if (ballDiv.style.top == 100 + 'px') {
                ballDX = 0;
                ballDY = 5;
                HitWall.play();
            }
            if (ballDiv.style.top == 340 + 'px') {
                ballDX = 0;
                ballDY = -5;
                HitWall.play();
            }
            if (ballDiv.style.left == 80 + 'px') {
                ballDX = 5;
                ballDY = 0;
                HitWall.play();
            }
            if (ballDiv.style.left == 330 + 'px' && ballDiv.style.top >= 100 + 'px' && ballDiv.style.top <= 180 + 'px') {
                ballDX = -5;
                ballDY = 0;
                HitWall.play();
            }
            if (ballDiv.style.left == 330 + 'px' && ballDiv.style.top >= 275 + 'px' && ballDiv.style.top <= 360 + 'px') {
                ballDX = -5;
                ballDY = 0;
                HitWall.play();
            }



            // tile 1
            if (box1.inBox == 'o1InBox' && box1.o1 && ballDiv.style.top == parseInt(box1.y) + 'px' && ballDiv.style.left == parseInt(box1.x) + 'px' && left) {
                ballDX = 0;
                ballDY = -5;
                HitStone.play();
            }
            if (box1.inBox == 'o1InBox' && box1.o1 && ballDiv.style.top == parseInt(box1.y) + 'px' && ballDiv.style.left == parseInt(box1.x) + 'px' && up) {
                ballDX = -5;
                ballDY = 0;
                HitStone.play();
            }
            if (box1.inBox == 'o1InBox' && box1.o1 && ballDiv.style.top == parseInt(box1.y) + 'px' && ballDiv.style.left == parseInt(box1.x) + 'px' && right) {
                ballDX = 0;
                ballDY = 5;
                HitStone.play();
            }
            if (box1.inBox == 'o1InBox' && box1.o1 && ballDiv.style.top == parseInt(box1.y) + 'px' && ballDiv.style.left == parseInt(box1.x) + 'px' && down) {
                ballDX = 5;
                ballDY = 0;
                HitStone.play();
            }
            if (box1.inBox == 'o2InBox' && box1.o2 && ballDiv.style.top == parseInt(box1.y) + 'px' && ballDiv.style.left == parseInt(box1.x) + 'px' && left) {
                ballDX = 0;
                ballDY = 5;
                HitStone.play();
            }
            if (box1.inBox == 'o2InBox' && box1.o2 && ballDiv.style.top == parseInt(box1.y) + 'px' && ballDiv.style.left == parseInt(box1.x) + 'px' && up) {
                ballDX = 5;
                ballDY = 0;
                HitStone.play();
            }
            if (box1.inBox == 'o2InBox' && box1.o2 && ballDiv.style.top == parseInt(box1.y) + 'px' && ballDiv.style.left == parseInt(box1.x) + 'px' && right) {
                ballDX = 0;
                ballDY = -5;
                HitStone.play();
            }
            if (box1.inBox == 'o2InBox' && box1.o2 && ballDiv.style.top == parseInt(box1.y) + 'px' && ballDiv.style.left == parseInt(box1.x) + 'px' && down) {
                ballDX = -5;
                ballDY = 0;
                HitStone.play();
            }



            // tile 2
            if (box2.inBox == 'o1InBox' && box2.o1 && ballDiv.style.top == parseInt(box2.y) + 'px' && ballDiv.style.left == parseInt(box2.x) + 'px' && left) {
                ballDX = 0;
                ballDY = -5;
                HitStone.play();
            }
            if (box2.inBox == 'o1InBox' && box2.o1 && ballDiv.style.top == parseInt(box2.y) + 'px' && ballDiv.style.left == parseInt(box2.x) + 'px' && up) {
                ballDX = -5;
                ballDY = 0;
                HitStone.play();
            }
            if (box2.inBox == 'o1InBox' && box2.o1 && ballDiv.style.top == parseInt(box2.y) + 'px' && ballDiv.style.left == parseInt(box2.x) + 'px' && right) {
                ballDX = 0;
                ballDY = 5;
                HitStone.play();
            }
            if (box2.inBox == 'o1InBox' && box2.o1 && ballDiv.style.top == parseInt(box2.y) + 'px' && ballDiv.style.left == parseInt(box2.x) + 'px' && down) {
                ballDX = 5;
                ballDY = 0;
                HitStone.play();
            }
            if (box2.inBox == 'o2InBox' && box2.o2 && ballDiv.style.top == parseInt(box2.y) + 'px' && ballDiv.style.left == parseInt(box2.x) + 'px' && left) {
                ballDX = 0;
                ballDY = 5;
                HitStone.play();
            }
            if (box2.inBox == 'o2InBox' && box2.o2 && ballDiv.style.top == parseInt(box2.y) + 'px' && ballDiv.style.left == parseInt(box2.x) + 'px' && up) {
                ballDX = 5;
                ballDY = 0;
                HitStone.play();
            }
            if (box2.inBox == 'o2InBox' && box2.o2 && ballDiv.style.top == parseInt(box2.y) + 'px' && ballDiv.style.left == parseInt(box2.x) + 'px' && right) {
                ballDX = 0;
                ballDY = -5;
                HitStone.play();
            }
            if (box2.inBox == 'o2InBox' && box2.o2 && ballDiv.style.top == parseInt(box2.y) + 'px' && ballDiv.style.left == parseInt(box2.x) + 'px' && down) {
                ballDX = -5;
                ballDY = 0;
                HitStone.play();
            }


            // tile 4
            if (box4.inBox == 'o1InBox' && box4.o1 && ballDiv.style.top == parseInt(box4.y) + 'px' && ballDiv.style.left == parseInt(box4.x) + 'px' && left) {
                ballDX = 0;
                ballDY = -5;
                HitStone.play();
            }
            if (box4.inBox == 'o1InBox' && box4.o1 && ballDiv.style.top == parseInt(box4.y) + 'px' && ballDiv.style.left == parseInt(box4.x) + 'px' && up) {
                ballDX = -5;
                ballDY = 0;
                HitStone.play();
            }
            if (box4.inBox == 'o1InBox' && box4.o1 && ballDiv.style.top == parseInt(box4.y) + 'px' && ballDiv.style.left == parseInt(box4.x) + 'px' && right) {
                ballDX = 0;
                ballDY = 5;
                HitStone.play();
            }
            if (box4.inBox == 'o1InBox' && box4.o1 && ballDiv.style.top == parseInt(box4.y) + 'px' && ballDiv.style.left == parseInt(box4.x) + 'px' && down) {
                ballDX = 5;
                ballDY = 0;
                HitStone.play();
            }
            if (box4.inBox == 'o2InBox' && box4.o2 && ballDiv.style.top == parseInt(box4.y) + 'px' && ballDiv.style.left == parseInt(box4.x) + 'px' && left) {
                ballDX = 0;
                ballDY = 5;
                HitStone.play();
            }
            if (box4.inBox == 'o2InBox' && box4.o2 && ballDiv.style.top == parseInt(box4.y) + 'px' && ballDiv.style.left == parseInt(box4.x) + 'px' && up) {
                ballDX = 5;
                ballDY = 0;
                HitStone.play();
            }
            if (box4.inBox == 'o2InBox' && box4.o2 && ballDiv.style.top == parseInt(box4.y) + 'px' && ballDiv.style.left == parseInt(box4.x) + 'px' && right) {
                ballDX = 0;
                ballDY = -5;
                HitStone.play();
            }
            if (box4.inBox == 'o2InBox' && box4.o2 && ballDiv.style.top == parseInt(box4.y) + 'px' && ballDiv.style.left == parseInt(box4.x) + 'px' && down) {
                ballDX = -5;
                ballDY = 0;
                HitStone.play();
            }



            // tile 5
            if (box5.inBox == 'o2InBox' && box5.o2 && ballDiv.style.top == parseInt(box5.y) + 'px' && ballDiv.style.left == parseInt(box5.x) + 'px' && up) {
                ballDX = 5;
                ballDY = 0;
                HitStone.play();
            }
            if (box5.inBox == 'o2InBox' && box5.o2 && ballDiv.style.top == parseInt(box5.y) + 'px' && ballDiv.style.left == parseInt(box5.x) + 'px' && down) {
                ballDX = -5;
                ballDY = 0;
                HitStone.play();
            }
            if (box5.inBox == 'o2InBox' && box5.o2 && ballDiv.style.top == parseInt(box5.y) + 'px' && ballDiv.style.left == parseInt(box5.x) + 'px' && left) {
                ballDX = 0;
                ballDY = 5;
                HitStone.play();
            }
            if (box5.inBox == 'o2InBox' && box5.o2 && ballDiv.style.top == parseInt(box5.y) + 'px' && ballDiv.style.left == parseInt(box5.x) + 'px' && right) {
                ballDX = 0;
                ballDY = -5;
                HitStone.play();
            }
            if (box5.inBox == 'o1InBox' && box5.o1 && ballDiv.style.top == parseInt(box5.y) + 'px' && ballDiv.style.left == parseInt(box5.x) + 'px' && up) {
                ballDX = -5;
                ballDY = 0;
                HitStone.play();
            }
            if (box5.inBox == 'o1InBox' && box5.o1 && ballDiv.style.top == parseInt(box5.y) + 'px' && ballDiv.style.left == parseInt(box5.x) + 'px' && right) {
                ballDX = 0;
                ballDY = 5;
                HitStone.play();
            }
            if (box5.inBox == 'o1InBox' && box5.o1 && ballDiv.style.top == parseInt(box5.y) + 'px' && ballDiv.style.left == parseInt(box5.x) + 'px' && left) {
                ballDX = 0;
                ballDY = -5;
                HitStone.play();
            }
            if (box5.inBox == 'o1InBox' && box5.o1 && ballDiv.style.top == parseInt(box5.y) + 'px' && ballDiv.style.left == parseInt(box5.x) + 'px' && down) {
                ballDX = 5;
                ballDY = 0;
                HitStone.play();
            }



            // tile 8
            if (box8.inBox == 'o2InBox' && box8.o2 && ballDiv.style.top == parseInt(box8.y) + 'px' && ballDiv.style.left == parseInt(box8.x) + 'px' && up) {
                ballDX = 5;
                ballDY = 0;
                HitStone.play();
            }
            if (box8.inBox == 'o2InBox' && box8.o2 && ballDiv.style.top == parseInt(box8.y) + 'px' && ballDiv.style.left == parseInt(box8.x) + 'px' && down) {
                ballDX = -5;
                ballDY = 0;
                HitStone.play();
            }
            if (box8.inBox == 'o2InBox' && box8.o2 && ballDiv.style.top == parseInt(box8.y) + 'px' && ballDiv.style.left == parseInt(box8.x) + 'px' && left) {
                ballDX = 0;
                ballDY = 5;
                HitStone.play();
            }
            if (box8.inBox == 'o2InBox' && box8.o2 && ballDiv.style.top == parseInt(box8.y) + 'px' && ballDiv.style.left == parseInt(box8.x) + 'px' && right) {
                ballDX = 0;
                ballDY = -5;
                HitStone.play();
            }
            if (box8.inBox == 'o1InBox' && box8.o1 && ballDiv.style.top == parseInt(box8.y) + 'px' && ballDiv.style.left == parseInt(box8.x) + 'px' && up) {
                ballDX = -5;
                ballDY = 0;
                HitStone.play();
            }
            if (box8.inBox == 'o1InBox' && box8.o1 && ballDiv.style.top == parseInt(box8.y) + 'px' && ballDiv.style.left == parseInt(box8.x) + 'px' && right) {
                ballDX = 0;
                ballDY = 5;
                HitStone.play();
            }
            if (box8.inBox == 'o1InBox' && box8.o1 && ballDiv.style.top == parseInt(box8.y) + 'px' && ballDiv.style.left == parseInt(box8.x) + 'px' && left) {
                ballDX = 0;
                ballDY = -5;
                HitStone.play();
            }
            if (box8.inBox == 'o1InBox' && box8.o1 && ballDiv.style.top == parseInt(box8.y) + 'px' && ballDiv.style.left == parseInt(box8.x) + 'px' && down) {
                ballDX = 5;
                ballDY = 0;
                HitStone.play();
            }


            // winning screen
            if (ballDiv.style.top == 225 + 'px' && ballDiv.style.left == 350 + 'px') {
                clearInterval(move);
                ballDX = 0;
                ballDY = 0;
                $("#timerScore").html("Time: " + $("#timer").text());
                $('#winningScreen').show();
                stopCounter();
            }
        }


        $('#submit').click(function () {
            $('#win').hide();
            $('#formContainer').hide();
            $('#gameScreen').hide();
            $('#start_screen').show();
        });

    } // level one game ends here

});