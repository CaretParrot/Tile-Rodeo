let days;
let hours;
let minutes;
let seconds;
let timerRunning = false;
let whitesTurn = null;
let timer;

setClocks(id("daysTime").value, id("hoursTime").value, id("minutesTime").value, id("secondsTime").value, id("daysTime").value, id("hoursTime").value, id("minutesTime").value, id("secondsTime").value);

let timerData = {
    increment: null,
    white: {
        totalTime: null,
        days: null,
        hours: null,
        minutes: null,
        seconds: null
    },
    black: {
        totalTime: null,
        days: null,
        hours: null,
        minutes: null,
        seconds: null
    }
}

function switchPage(pageId) {
    let allPages = document.getElementsByClassName("page");
    console.log(allPages);

    for (let i = 0; i < allPages.length; i++) {
        allPages[i].style.display = "none";
    }

    id(pageId).style.display = "flex";

    for (let i = 0; i < id(pageId).children.length; i++) {
        if (id(pageId).children[i].id === "timeSelector") {
            id(pageId).children[i].style.display = "grid";
        } else {
            id(pageId).children[i].style.display = "flex";
        }
    }

    timerRunning = false;
    whitesTurn = null;

    id("startButton").innerHTML = "Start";
    id("backButton").style.display = "flex";

    setClocks(id("daysTime").value, id("hoursTime").value, id("minutesTime").value, id("secondsTime").value, id("daysTime").value, id("hoursTime").value, id("minutesTime").value, id("secondsTime").value);
}

function toggleClock() {
    if (timerRunning === false) {
        timerRunning = true;
        whitesTurn = true;
        timerData.white.totalTime = (+id("daysTime").value * 86400) + (+id("hoursTime").value * 3600) + (+id("minutesTime").value * 60) + +id("secondsTime").value;
        timerData.black.totalTime = (+id("daysTime").value * 86400) + (+id("hoursTime").value * 3600) + (+id("minutesTime").value * 60) + +id("secondsTime").value;
        timerData.increment = (+id("daysIncrement").value * 86400) + (+id("hoursIncrement").value * 3600) + (+id("minutesIncrement").value * 60) + +id("secondsIncrement").value;

        id("startButton").innerHTML = "↺";
        id("backButton").style.display = "none";

        timer = setInterval(function () {
            if (whitesTurn === true) {
                timerData.white.totalTime--;
            } else {
                timerData.black.totalTime--;
            }
            updateClocks();

            if (timerData.white.totalTime === 0) {
                id("whiteTime").innerHTML = "Black wins!";
                id("blackTime").innerHTML = "Black wins!";
                id("backButton").style.display = "flex";

                clearInterval(timer);
            }

            if (timerData.black.totalTime === 0) {
                id("whiteTime").innerHTML = "White wins!";
                id("blackTime").innerHTML = "White wins!";
                id("backButton").style.display = "flex";

                clearInterval(timer);
            }
        }, 1000);

    } else {
        timerRunning = false;
        whitesTurn = null;

        id("startButton").innerHTML = "Start";
        id("backButton").style.display = "flex";

        setClocks(id("daysTime").value, id("hoursTime").value, id("minutesTime").value, id("secondsTime").value, id("daysTime").value, id("hoursTime").value, id("minutesTime").value, id("secondsTime").value);
        clearInterval(timer);
    }
}

function togglePlayer() {
    if (whitesTurn === true && timerRunning === true) {
        whitesTurn = false;
        timerData.white.totalTime += timerData.increment;
        updateClocks();
    } else if (timerRunning === true) {
        whitesTurn = true;
        timerData.black.totalTime += timerData.increment;
        updateClocks();
    }
}

function updateClocks() {
    timerData.white.days = Math.floor(timerData.white.totalTime / 86400);
    timerData.white.hours = Math.floor((timerData.white.totalTime % 86400) / 3600);
    timerData.white.minutes = Math.floor(((timerData.white.totalTime % 86400) % 3600) / 60);
    timerData.white.seconds = Math.floor(((timerData.white.totalTime % 86400) % 3600) % 60);
    timerData.black.days = Math.floor(timerData.black.totalTime / 86400);
    timerData.black.hours = Math.floor((timerData.black.totalTime % 86400) / 3600);
    timerData.black.minutes = Math.floor(((timerData.black.totalTime % 86400) % 3600) / 60);
    timerData.black.seconds = Math.floor(((timerData.black.totalTime % 86400) % 3600) % 60);
    setClocks(timerData.white.days, timerData.white.hours, timerData.white.minutes, timerData.white.seconds, timerData.black.days, timerData.black.hours, timerData.black.minutes, timerData.black.seconds);
}

function setClocks(whiteDays, whiteHours, whiteMinutes, whiteSeconds, blackDays, blackHours, blackMinutes, blackSeconds) {
    let newWhiteDays = whiteDays;
    let newWhiteHours = whiteHours;
    let newWhiteMinutes = whiteMinutes;
    let newWhiteSeconds = whiteSeconds;
    let newBlackDays = blackDays;
    let newBlackHours = blackHours;
    let newBlackMinutes = blackMinutes;
    let newBlackSeconds = blackSeconds;

    if (+blackDays === 0) {
        newBlackDays = "";
    } else if (blackDays.toString().length === 1) {
        newBlackDays = `0${blackDays}:`;
    } else {
        newBlackDays = `${blackDays}:`;
    }

    if (+blackHours === 0 && +blackDays === 0) {
        newBlackHours = "";
    } else if (blackHours.toString().length === 1) {
        newBlackHours = `0${blackHours}:`;
    } else {
        newBlackHours = `${blackHours}:`;
    }

    if (blackMinutes.toString().length === 1) {
        newBlackMinutes = `0${blackMinutes}:`;
    } else {
        newBlackMinutes = `${blackMinutes}:`;
    }

    if (blackSeconds.toString().length === 1) {
        newBlackSeconds = `0${blackSeconds}`;
    } else {
        newBlackSeconds = `${blackSeconds}`;
    }

    if (+whiteDays === 0) {
        newWhiteDays = "";
    } else if (whiteDays.toString().length === 1) {
        newWhiteDays = `0${whiteDays}:`;
    } else {
        newWhiteDays = `${whiteDays}:`;
    }

    if (+whiteHours === 0 && +whiteDays === 0) {
        newWhiteHours = "";
    } else if (whiteHours.toString().length === 1) {
        newWhiteHours = `0${whiteHours}:`;
    } else {
        newWhiteHours = `${whiteHours}:`;
    }

    if (whiteMinutes.toString().length === 1) {
        newWhiteMinutes = `0${whiteMinutes}:`;
    } else {
        newWhiteMinutes = `${whiteMinutes}:`;
    }

    if (whiteSeconds.toString().length === 1) {
        newWhiteSeconds = `0${whiteSeconds}`;
    } else {
        newWhiteSeconds = `${whiteSeconds}`;
    }

    id("blackTime").innerHTML = `${newBlackDays}${newBlackHours}${newBlackMinutes}${newBlackSeconds}`;
    id("whiteTime").innerHTML = `${newWhiteDays}${newWhiteHours}${newWhiteMinutes}${newWhiteSeconds}`;
}

oninput = function (event) {
    setClocks(id("daysTime").value, id("hoursTime").value, id("minutesTime").value, id("secondsTime").value, id("daysTime").value, id("hoursTime").value, id("minutesTime").value, id("secondsTime").value);
}