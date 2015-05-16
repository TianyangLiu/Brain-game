var i, timerstop, divide, minute;
	i =0;
	divide = 1;
	function start(){
		timerstop = self.setInterval("increment()",(1000/divide))
	}
	function increment(){
		i++;
		document.getElementById("timer_out").innerHTML=(i/divide);
      
	}
	function stoptime(){
            
		clearInterval(timerstop);
		timerstop = null;
	}
   
    