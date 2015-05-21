var timerCount = null;

function startCounter() {
    timerCount = setInterval(timerIncrement, 1000);
}

function stopCounter() {
    clearInterval(timerCount);
    timerCount = null;
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
        $("#timer").html("Time has stopped.");
    }

    $("#timer").text(pad(hours) + ":" + pad(mins) + ":" + pad(seconds));
}

function pad(number) {
    if (number <= 99) {
        number = ("0" + number).slice(-2);
    }
    return number;
}