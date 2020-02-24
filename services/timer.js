'use strict';
const { getScore, setScore } = require('../services/score');

// Update the count down every 1 second
let clockInterval;

exports.startClock = () => {
    // get the io
    const io = require('../services/sockets').io();

    // Set the date we're counting down to
    const countDownDate = new Date().setHours(new Date().getHours() + 1);

    clockInterval = setInterval(async function () {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // If count down is finished
        if (distance <= 0) {
            // send to everyone
            io.emit('doomMsgShow');
            await io.emit('updateScore', await setScore(0));
            await io.emit('updateScore', await getScore());
            exports.stopClock();
            exports.startClock();
            return;
        }

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        io.emit('updateClock', { days: days, hours: hours, minutes: minutes, seconds: seconds });
    }, 1000);
}


exports.stopClock = () => {
    clearInterval(clockInterval);
}
