let days;
let hours;
let minutes;
let seconds;
let timerRunning = false;
let whitesTurn = null;
let timer;

setClocks();

let timerData = {
    whiteTotalTime: null,
    blackTotalTime: null
}

function switchPage(pageId) {
    let allPages = document.getElementsByClassName("page");

    for (let i = 0; i < allPages.length; i++) {
        allPages[i].style.display = "none";
    }

    id(pageId).style.display = "flex";
}

function toggleClock() {
    if (timerRunning === false) {
        timerRunning = true;
        whitesTurn = true;
        timerData.whiteTotalTime = +id("daysTime").value + +id("hoursTime").value + +id("minutesTime").value + +id("secondsTime").value;
        timerData.blackTotalTime = +id("daysTime").value + +id("hoursTime").value + +id("minutesTime").value + +id("secondsTime").value;
        id("middleButton").innerHTML = "Reset";
        
        timer = setInterval(function () {
            if (whitesTurn === true) {
                timerData.whiteTotalTime--;
            } else {
                timerData.blackTotalTime--;
            }
            updateClocks();
        }, 1000);
    } else {
        timerRunning = false;
        clearInterval(timer);
    }
}

function updateClocks() {
    let whiteDays = Math.floor(timerData.whiteTotalTime / 86400);
    let whiteHours = Math.floor((timerData.whiteTotalTime % 86400) / 3600);
    let whiteMinutes = Math.floor(((timerData.whiteTotalTime % 86400) % 3600) / 60);
    let whiteSeconds = Math.floor(((timerData.whiteTotalTime % 86400) % 3600) / 60);

}

function setClocks(whiteDays, whiteHours, whiteMinutes, whiteSeconds, blackDays, blackHours, blackMinutes, blackSeconds) {
    days = id("daysTime").value;
    hours = id("hoursTime").value;
    minutes = id("minutesTime").value;
    seconds = id("secondsTime").value;

    if (+id("daysTime").value === 0) {
        days = "";
    } else if (id("daysTime").value.length === 1) {
        days = `0${days}:`;
    } else {
        days = `${days}:`;
    }

    if (+id("hoursTime").value === 0 && +id("daysTime").value === 0) {
        hours = "";
    } else if (id("hoursTime").value.length === 1) {
        hours = `0${hours}:`;
    } else {
        hours = `${hours}:`;
    }

    if (id("minutesTime").value.length === 1) {
        minutes = `0${minutes}:`;
    } else {
        minutes = `${minutes}:`;
    }

    if (id("secondsTime").value.length === 1) {
        seconds = `0${seconds}`;
    } else {
        seconds = `${seconds}:`;
    }

    id("blackTime").innerHTML = `${days}${hours}${minutes}${seconds}`;
    id("whiteTime").innerHTML = `${days}${hours}${minutes}${seconds}`;
}

oninput = function (event) {
    setClocks();
}