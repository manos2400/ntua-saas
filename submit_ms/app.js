const express = require('express')
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true, limit: '100mb'}));
app.use(express.json());
// app.use((req, res, next) => { res.status(404).json({ message: 'Endpoint Not Found' }) }); 

module.exports = app;

