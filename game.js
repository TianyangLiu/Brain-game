var canvas,
	ctx,
	width,
	height,
	main_page;
	
var start_screen = new Image();
start_screen.src = 'images/start_screen_background2.jpg';

var mouseX = 0;
var mouseY = 0;

var btnPlay = new start_button(97, 318, 549, 603);

var btnBack = new back_button(78, 149, 526, 569);




function main(){
	var x = 0;
	var y = 0;
	
	canvas = document.createElement('canvas');
	
	
	
	//create a canvas
	width = window.innerWidth;
	height = window.innerHeight;
	
	if(width <= 1980 || height <= 1080){
		width = 414;
		height = 736;
		canvas.style.border = '10px solid #000';
	}
	
	canvas.width = width;
	canvas.height = height;
	ctx = canvas.getContext('2d');
	
	document.body.appendChild(canvas);
	//-------------------
	
	
	
	
	start_screen.onload = function(){
		ctx.drawImage(start_screen, x, y, canvas.width, canvas.height);
		document.addEventListener('click', mouseClicked, false);
	}
	
}

function run(){
	var loop = function(){
		update();
		render();
		window.requestAnimationFrame(loop, canvas);
	}
	window.requestAnimationFrame(loop, canvas);
}

function update(){
	
}

function render(){
	
}


/* 
************************
button functions start here
************************
*/
function play(){
	var x = 0;
	var y = 0;
	
	var level_stage = new Image();
	level_stage.src = 'images/level_page.jpg';
	ctx.drawImage(level_stage, x, y, canvas.width, canvas.height);
}

function back_to_startScreen(){
	var x = 0;
	var y = 0;
	
	ctx.drawImage(start_screen, x, y, canvas.width, canvas.height);
}





//开始按钮的位置及判定
//the position of start button
function start_button(xL, xR, yT, yB){
	this.xLeft = xL;
	this.xRight = xR;
	this.yTop = yT;
	this.yButtom = yB;
}
start_button.prototype.checkClicked = function(){
	if(this.xLeft <= mouseX && mouseX <= this.xRight && this.yTop <= mouseY && mouseY <= this.yButtom){
		return true;
	}
}
//-----------------------




//
function back_button(xL, xR, yT, yB){
	this.xLeft = xL;
	this.xRight = xR;
	this.yTop = yT;
	this.yButtom = yB;
}
back_button.prototype.checkClicked = function(){
	if(this.xLeft <= mouseX && mouseX <= this.xRight && this.yTop <= mouseY && mouseY <= this.yButtom){
		return true;
	}
}






function mouseClicked(event){
	mouseX = event.pageX - canvas.offsetLeft;
	mouseY = event.pageY - canvas.offsetTop;
	if(btnPlay.checkClicked()){
		play();
	};
	
	if(btnBack.checkClicked()){
		back_to_startScreen();
	}
}
/* **********************
button functions END here
 ************************
*/
main();