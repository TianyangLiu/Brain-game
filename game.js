var x = 0,
	y = 0,
	ballSpeedX = 0,
	ballSpeedY = -5;
	
/**
	load all the images here
*/
var start_screen = new Image();
	start_screen.src = 'images/start_screen.jpg';
	start_screen.addEventListener('load', init, false);
	
var level_stage = new Image();
	level_stage.src = 'images/level_page.jpg';
	level_stage.addEventListener('load', init, false);

var level_one = new Image();
	level_one.src = 'images/game_board_one.png';
	level_one.addEventListener('load', init, false);
	
var intruction_one = new Image();
	intruction_one.src = 'images/Instruction1.png';
	intruction_one.addEventListener('load', init, false);

var intruction_two = new Image();
	intruction_two.src = 'images/Instruction2.png';
	intruction_two.addEventListener('load', init, false);

var intruction_three = new Image();
	intruction_three.src = 'images/Instruction3.png';
	intruction_three.addEventListener('load', init, false);
/**
	load all the images end here
*/




// add music and sound effects start here
var ClickButton = new Audio();
ClickButton.src = "music/ClickButton.mp3";

var HitWall = new Audio();
HitWall.src = "music/HitWall.mp3";

var bgm = new Audio();
bgm.src = "music/bgm2.mp3";
bgm.play();

var bgm2 = new Audio();
bgm2.src = "music/bgm3.mp3"
// add music and sound effects end here





/** 
	button positions start here
*/
var btnPlay = new Button(97, 318, 549, 603);
var btnStart = new Button(23, 130, 671, 713);
var btnLevelOne = new Button(78, 149, 166, 209);
var theBall = new Button(200, 221, 402, 422);
var btnIntruction = new Button(97, 318, 640, 695);
var btnIPOne_R = new Button(327, 392, 671, 713); //instruction page one button(right)
var btnIPTwo_R = new Button(327, 392, 671, 713); //instruction page two button(right)
var btnIPTwo_L = new Button(252, 317, 671, 713); //instruction page two button(left)
var btnIPThree_R = new Button(327, 392, 671, 713); //instruction page three button(right)
/** 
	button positions end here
*/





// set up canvas
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var width = window.innerWidth;
var height = window.innerHeight;
	
if(width <= 1980 || height <= 1080){
	width = 414;
	height = 736;
}
	
canvas.width = width;
canvas.height = height;

	


//--------------------------- Variables end here ---------------------------------------
	
	
function init(){
	run();
	document.addEventListener('click', mouseClicked, false);
}


function run(){
	ctx.drawImage(start_screen, x, y, canvas.width, canvas.height);
}


function Button(xL, xR, yT, yB){
	this.xLeft = xL;
	this.xRight = xR;
	this.yTop = yT;
	this.yButtom = yB;
}
	
	
Button.prototype.checkClicked = function () {
	if (this.xLeft <= mouseX && mouseX <= this.xRight && this.yTop <= mouseY && mouseY <= this.yButtom) {
		return true;
		ClickButton.play();
	}
}





// mouse click events start here
function mouseClicked(e){
	mouseX = e.pageX - canvas.offsetLeft;
	mouseY = e.pageY - canvas.offsetTop;
	
	if(btnPlay.checkClicked()){
		play();
        ClickButton.play();
        bgm.pause();
        bgm2.play();

        btnPlay = new Button(0,0,0,0); //disable play button
        btnIntruction = new Button(0,0,0,0);
        btnStart = new Button(0,0,0,0);
        btnIPOne_R= new Button(0,0,0,0);
	    btnIPTwo_R= new Button(0,0,0,0);
		btnIPThree_R= new Button(0,0,0,0);
		btnIPTwo_L= new Button(0,0,0,0); 
	}
	/*if(btnBack.checkClicked()){
		startScreen();
        ClickButton.play();

        btnPlay = new Button(97, 318, 549, 603);
        btnIntruction = new Button(97, 318, 640, 695);

	}*/

	if(btnIntruction.checkClicked()){
        instructionScreenOne();
        ClickButton.play();
		
		btnPlay = new Button(0,0,0,0); //disable play button
        //btnStart = new Button(0,0,0,0);
        btnIntruction = new Button(0,0,0,0);
        //btnIPOne_R= new Button(0,0,0,0);
	    btnIPTwo_R = new Button(0,0,0,0);
		btnIPThree_R = new Button(0,0,0,0);
		btnIPTwo_L = new Button(0,0,0,0); 
		btnLevelOne = new Button(0,0,0,0);
    }

    if (btnStart.checkClicked()) { 
        play();
        ClickButton.play();
        bgm.pause();
        bgm2.play(); 
        btnIPTwo_R = new Button(0,0,0,0);
        btnStart = new Button(0, 0, 0, 0);
        btnLevelOne = new Button(78, 149, 166, 209);
    }

	if(btnIPOne_R.checkClicked()){
        instructionScreenTwo();
        ClickButton.play();

        btnPlay = new Button(0,0,0,0); //disable play button
        btnIntruction = new Button(0,0,0,0);
        btnIPOne_R= new Button(0,0,0,0);
	    //btnIPTwo_R = new Button(0,0,0,0);
		btnIPThree_R = new Button(0,0,0,0);
		btnIPTwo_L = new Button(0,0,0,0); 
		btnLevelOne = new Button(0,0,0,0);
        //btnIPTwo_R = new Button(327, 392, 671, 713);
    }

	if(btnIPTwo_R.checkClicked()){
        instructionScreenTwo();
        ClickButton.play();
        
    }
	/*if(btnIPTwo_L.checkClicked()){
        instructionScreenOne();
        ClickButton.play();	
    }*/
	if(btnIPThree_R.checkClicked()){
        instructionScreenThree();
        ClickButton.play();
    }

    if(btnLevelOne.checkClicked()){
        play_level_one();
        ClickButton.play();
		
		btnPlay = new Button(0,0,0,0); //disable play button
		btnBack = new Button(0,0,0,0); // disable back-arrow button
		btnLevelOne = new Button(0,0,0,0); //disable level-one button
		btnIntruction = new Button(0,0,0,0); //disable instruction button
		btnIPOne_R= new Button(0,0,0,0);
		btnIPTwo_R= new Button(0,0,0,0);
		btnIPThree_R= new Button(0,0,0,0);
		btnIPTwo_L= new Button(0,0,0,0);
	
    }
	if(theBall.checkClicked()){
        level_one_start();
        setInterval(level_one_start, 15);
        ClickButton.play();
    }
}
// mouse click events end here





	
	
/**
	page links start here
*/
function play(){
	ctx.drawImage(level_stage, x, y, canvas.width, canvas.height);
}
function startScreen(){
	ctx.drawImage(start_screen, x, y, canvas.width, canvas.height);
	
	
}
function play_level_one(){
	ctx.drawImage(level_one, x, y, canvas.width, canvas.height);

    ballX = 206;
    ballY = 411;
    radius = 10;
	startAngle = 0;
	endAngle = 2*Math.PI;

    ctx.beginPath();
	ctx.arc(ballX,ballY,radius,startAngle,endAngle);
	ctx.fill();
}	
function level_one_start(){
    ctx.drawImage(level_one, x, y, canvas.width, canvas.height);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    ctx.beginPath();
	ctx.arc(ballX,ballY,radius,startAngle,endAngle);
	ctx.fill();

	ball_direction();
}
function instructionScreenOne(){
    ctx.drawImage(intruction_one, x, y, canvas.width, canvas.height);  
}

function instructionScreenTwo() {
    ctx.drawImage(intruction_two, x, y, canvas.width, canvas.height); 
}

function instructionScreenThree(){
    ctx.drawImage(intruction_three, x, y, canvas.width, canvas.height);
}
/**
	page links end here
*/






function ball_direction(){
    if(ballY < 380){
        tile_transform = new Image();
	    tile_transform.src = 'images/game_board_two.png';
	    ctx.drawImage(tile_transform, x, y, canvas.width, canvas.height);

        ctx.beginPath();
	    ctx.arc(ballX,ballY,radius,startAngle,endAngle);
	    ctx.fill();

	    direction_change();
        
    }
	
	function direction_change(){
            if(ballY <= 140){
                ballSpeedY = 5;
                HitWall.play();
            }else if(ballY > 375){
            ballSpeedY = -5;
            HitWall.play();
            }
    }
}
	
