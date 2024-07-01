const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: '*', // Allow all -- TODO: update this later
    //origin: ['http://localhost:3001', 'http://localhost:3002'], // for example
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};

app.use(cors(corsOptions));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', require('../routes/getCredits'));
app.use('/', require('../routes/addCredits'));
app.use('/', require('../routes/getStatus'));

module.exports = app;