const express = require('express');
const app = express();
const mongoose = require('mongoose').set('debug', true);
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

//LISTEN TO SERVER ON PORT
const port = process.env.PORT || 8080;
let server = app.listen(port, () => console.log(`Server started on port ${port}`));

require('./services/sockets').initialize(server);
const { startClock, stopClock } = require('./services/timer');

//Cnnect to db
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('connected to db');
        startClock();
    })
    .catch(error => console.log('db connection error - ', error));
