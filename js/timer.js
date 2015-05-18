var i, timerstop, divide, gu8, minutestop, timer_out;
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