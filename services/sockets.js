const { startClock, stopClock } = require('./timer');
const { getScore, setScore } = require('./score');

const sio = require('socket.io');
let io = null;

exports.io = function () {
    return io;
};

exports.initialize = function (server) {
    io = sio(server);
    io.on('connection', async function (socket) {
        console.log('a user connected');
        io.emit('updateScore', await getScore());

        // save button pushed
        socket.on('save', async function () {
            console.log('save');
            stopClock();
            startClock();
            await setScore(await getScore() + 1);
            await io.emit('updateScore', await getScore());
            socket.emit('saveMsgShow');
        });

        // disconnect
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });
};