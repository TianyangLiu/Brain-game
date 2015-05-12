// start screen
$('#playBtn').click( function() {
	$('#start_screen').hide();
	$('#level_selection').show();
});


// instruction page one
$('#instructionBtn').click( function() {
	$('#start_screen').hide();
	$('#instructionOne').show();
});


// start button on instruction page one
$('.startGame').click( function() {
	$('#instructionOne').hide();
	$('#instructionTwo').hide();
	$('#instructionThree').hide();
	$('#level_selection').show();
});


// right arrow button on instruction page one
$('#rightArrow1').click( function() {
	$('#instructionOne').hide();
	$('#instructionTwo').show();
});


// right arrow button on instruction page two
$('#rightArrow2').click( function() {
	$('#instructionTwo').hide();
	$('#instructionThree').show();
});

$('#leftArrow').click( function() {
	$('#instructionTwo').hide();
	$('#instructionOne').show();
});


$('#leftArrow3').click( function() {
	$('#instructionThree').hide();
	$('#instructionTwo').show();
});


// level seletion page to game page
$('#levelOneBtn').click( function() {
	$('#level_selection').hide();
	$('#gameScreen').show();
});

$('#leftArrow2').click( function() {
	$('#level_selection').hide();
	$('#start_screen').show();
});


