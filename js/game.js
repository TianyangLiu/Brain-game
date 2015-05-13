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
    ion.sound.play("click_button");
    ion.sound.play("gamebg");//new game sound starts
    ion.sound.stop("startbg");//new game sound starts
});

$('#leftArrow2').click( function() {
	$('#level_selection').hide();
	$('#start_screen').show();
    ion.sound.play("click_button");
});


});