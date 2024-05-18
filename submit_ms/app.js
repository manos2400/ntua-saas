const express = require('express')
const cors = require('cors')

const app = express();

app.use(cors());
//app.use((req, res, next) => { res.status(404).json({ message: 'Endpoint Not Found' }) }); 

module.exports = app;

