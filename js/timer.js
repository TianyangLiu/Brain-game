function startCounter() {
    timerCount = setInterval(timerIncrement, 1000);
}

function stopCounter() {
    clearInterval(timerCount);
}

function timerIncrement() {
    var hours;
    var mins;
    var seconds;
    var timeDisplay = $("#timer").text();
    var splitter = timeDisplay.split(":");

    hours = Number(splitter[0]);
    mins = Number(splitter[1]);
    seconds = Number(splitter[2]);

    seconds++;

    if (seconds == 60) {
        seconds = 0;
        mins += 1;
    }
    if (mins == 60) {
        mins = 0;
        hours += 1;
    }
    if (hours == 24) {
        $("#timer").innerHTML = "Time has stopped.";
    }

    $("#timer").text(pad(hours) + ":" + pad(mins) + ":" + pad(seconds));
}

function pad(number) {
    if (number <= 99) {
        number = ("0" + number).slice(-2);
    }
    return number;
}




/*var i, timerstop, divide, gu8, minutestop, timer_out;
	timer_out =0;
	divide = 1;
	j = 0;
	function start(){
		timerstop = self.setInterval("increment()",(1000/divide))
        minutestop = self.setInterval("increments()",(60000/divide))
	}
	function increment(){
	
	
	 
		timer_out++;
		if(timer_out>=60){
	        timer_out = 0;
	    }
		document.getElementById("timer_out").innerHTML=(timer_out/divide);
	
     
	}
	
		function increments(){
		
		j++;
        document.getElementById("minutes").innerHTML=(j/divide);
      
	}
	function stoptime(){
            
		clearInterval(timerstop);
		timerstop = null;
        clearInterval(minutestop);
		minutestop = null;
	}
    */