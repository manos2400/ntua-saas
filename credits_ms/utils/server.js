const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', require('../routes/getCredits'));
app.use('/', require('../routes/addCredits'));

module.exports = app;