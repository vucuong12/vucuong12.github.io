var sign;
var numRound = 0;
var state = "off";
var numPress = 0;
var startingTime = 0;
var roundManager ;
var timeManager;


function writeTime(){
	//console.log(date.getTime());
	var date = new Date();
	document.getElementById("time").innerHTML = date.getTime() - startingTime;
}

function runTimeEachRound(){
	if (timeManager) clearInterval(timeManager);
	writeTime();
	timeManager = setInterval(writeTime, 100);
}

function runRound(){
	// check if previous round was done
	var date = new Date();
	startingTime = date.getTime();

	runTimeEachRound();
	
	if (numRound >= 1){
		if (numPress != numRound) {announceAndStop();return;}
		
	}
	document.getElementById("round").innerHTML = "Round " + (++numRound);
    var num1 = Math.floor((Math.random() * 50) + 1);
    var num2 = Math.floor((Math.random() * 50) + 1);
    document.getElementById("first-number").innerHTML = num1;
    document.getElementById("second-number").innerHTML = num2;
    if (num1 > num2) sign = 1;
    else if (num1 == num2) sign = 0;
    else sign = -1;
}


function run(){
	state = "on";
	document.getElementById("result").innerHTML = "";
	runRound();
    roundManager = setInterval(runRound, 1000);
}

function keepGoing(){
	clearInterval(roundManager);
	if (timeManager) clearInterval(timeManager);
	run();
}

function announceAndStop(){
	document.getElementById("result").innerHTML = "You lost ! " + (numRound - 1) + " rounds are completed !";
	stop();
}

function stop(){
	if (timeManager) clearInterval(timeManager);
	document.getElementById("time").innerHTML = "Time for each round: 1000s";
	numPress = 0;
	clearInterval(roundManager);
	document.getElementById("first-number").innerHTML = 0;
    document.getElementById("second-number").innerHTML = 0;
    document.getElementById("round").innerHTML = 1;
	numRound = 0;
	state = "off";
}



$(document).ready(function(){
	$("#start").click(function (e) {
		stop();
		run();
	});

	$("#reset").click(function (e) {
		document.getElementById("result").innerHTML = "";
	    stop();  
	});

	$(document).keydown(function(e) {
	    switch(e.which) {
	    	case 32:
	    		if (state == "off") {
	    			stop();
	    			run();
	    		}
	    		else 
	    			stop();
	    		break;
	        case 37: // left
	        	numPress++;
	        	if (state == "on")
	        	if (sign != -1) announceAndStop();
	        	else keepGoing();
	        	break;

	        case 39: // right
	        	numPress++;
	        	if (state == "on")
	        	if (sign != 1) announceAndStop(); 
	        	else keepGoing();
	        	break;

	        case 40: // down
	        	numPress++;
	        	if (state == "on")
	        	if (sign != 0) announceAndStop();
	        	else keepGoing();
	        	break;

	        default: return; // exit this handler for other keys
	    }
	    e.preventDefault(); // prevent the default action (scroll / move caret)
	});
});



