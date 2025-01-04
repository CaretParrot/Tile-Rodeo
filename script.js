let days;
let hours;
let minutes;
let seconds;
let timerRunning = false;
let whitesTurn = null;
let timer;

setClocks(document.getElementById("daysTime").value, document.getElementById("hoursTime").value, document.getElementById("minutesTime").value, document.getElementById("secondsTime").value, document.getElementById("daysTime").value, document.getElementById("hoursTime").value, document.getElementById("minutesTime").value, document.getElementById("secondsTime").value);

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

    for (let i = 0; i < allPages.length; i++) {
        allPages[i].style.display = "none";
    }

    document.getElementById(pageId).style.display = "grid";

    timerRunning = false;
    whitesTurn = null;

    document.getElementById("startButton").innerHTML = "Start";
    document.getElementById("backButton").style.display = "flex";

    setClocks(document.getElementById("daysTime").value, document.getElementById("hoursTime").value, document.getElementById("minutesTime").value, document.getElementById("secondsTime").value, document.getElementById("daysTime").value, document.getElementById("hoursTime").value, document.getElementById("minutesTime").value, document.getElementById("secondsTime").value);
}

function toggleClock() {
    document.getElementById("whiteTime").style.backgroundColor = "light-dark(var(--light-3), var(--dark-3)";
    if (timerRunning === false && whitesTurn === null) {
        timerRunning = true;
        whitesTurn = true;
        timerData.white.totalTime = (+document.getElementById("daysTime").value * 86400) + (+document.getElementById("hoursTime").value * 3600) + (+document.getElementById("minutesTime").value * 60) + +document.getElementById("secondsTime").value;
        timerData.black.totalTime = (+document.getElementById("daysTime").value * 86400) + (+document.getElementById("hoursTime").value * 3600) + (+document.getElementById("minutesTime").value * 60) + +document.getElementById("secondsTime").value;
        timerData.increment = (+document.getElementById("daysIncrement").value * 86400) + (+document.getElementById("hoursIncrement").value * 3600) + (+document.getElementById("minutesIncrement").value * 60) + +document.getElementById("secondsIncrement").value;

        document.getElementById("startButton").innerHTML = "↺";
        document.getElementById("backButton").style.display = "none";

        timer = setInterval(function () {
            if (whitesTurn === true) {
                timerData.white.totalTime--;
            } else {
                timerData.black.totalTime--;
            }
            updateClocks();

            if (timerData.white.totalTime === 0) {
                document.getElementById("whiteTime").innerHTML = "Black wins!";
                document.getElementById("blackTime").innerHTML = "Black wins!";
                document.getElementById("whiteTime").style.fontSize = "600%";
                document.getElementById("blackTime").style.fontSize = "600%";
                document.getElementById("backButton").style.display = "flex";

                clearInterval(timer);
                timerRunning = false;
                whitesTurn = "Reset";
            }

            if (timerData.black.totalTime === 0) {
                document.getElementById("whiteTime").innerHTML = "White wins!";
                document.getElementById("blackTime").innerHTML = "White wins!";
                document.getElementById("whiteTime").style.fontSize = "600%";
                document.getElementById("blackTime").style.fontSize = "600%";
                document.getElementById("backButton").style.display = "flex"; 

                clearInterval(timer);
                timerRunning = false;
                whitesTurn = "Reset";
            }
        }, 1000);

    } else if (whitesTurn === "Reset") {
        document.getElementById("startButton").innerHTML = "Start";

        setClocks(document.getElementById("daysTime").value, document.getElementById("hoursTime").value, document.getElementById("minutesTime").value, document.getElementById("secondsTime").value, document.getElementById("daysTime").value, document.getElementById("hoursTime").value, document.getElementById("minutesTime").value, document.getElementById("secondsTime").value);
        whitesTurn = null;
    } else {
        timerRunning = false;
        whitesTurn = null;

        document.getElementById("blackTime").style.backgroundColor = "light-dark(var(--light-2), var(--dark-2)";
        document.getElementById("whiteTime").style.backgroundColor = "light-dark(var(--light-2), var(--dark-2)";

        document.getElementById("startButton").innerHTML = "Start";
        document.getElementById("backButton").style.display = "flex";

        setClocks(document.getElementById("daysTime").value, document.getElementById("hoursTime").value, document.getElementById("minutesTime").value, document.getElementById("secondsTime").value, document.getElementById("daysTime").value, document.getElementById("hoursTime").value, document.getElementById("minutesTime").value, document.getElementById("secondsTime").value);
        clearInterval(timer);
    }
}

function togglePlayer() {
    if (whitesTurn === true && timerRunning === true) {
        whitesTurn = false;
        timerData.white.totalTime += timerData.increment;
        updateClocks();
        document.getElementById("blackTime").style.backgroundColor = "light-dark(var(--light-3), var(--dark-3)";
        document.getElementById("whiteTime").style.backgroundColor = "light-dark(var(--light-2), var(--dark-2)";
    } else if (timerRunning === true) {
        whitesTurn = true;
        timerData.black.totalTime += timerData.increment;
        updateClocks();
        document.getElementById("whiteTime").style.backgroundColor = "light-dark(var(--light-3), var(--dark-3)";
        document.getElementById("blackTime").style.backgroundColor = "light-dark(var(--light-2), var(--dark-2)";
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

    document.getElementById("blackTime").innerHTML = `${newBlackDays}${newBlackHours}${newBlackMinutes}${newBlackSeconds}`;
    document.getElementById("whiteTime").innerHTML = `${newWhiteDays}${newWhiteHours}${newWhiteMinutes}${newWhiteSeconds}`;
}

oninput = function (event) {
    setClocks(document.getElementById("daysTime").value, document.getElementById("hoursTime").value, document.getElementById("minutesTime").value, document.getElementById("secondsTime").value, document.getElementById("daysTime").value, document.getElementById("hoursTime").value, document.getElementById("minutesTime").value, document.getElementById("secondsTime").value);
}