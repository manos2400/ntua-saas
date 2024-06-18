const express = require('express')
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true, limit: '100mb'}));
app.use(express.json());

module.exports = app;

