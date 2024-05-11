const express = require('express');
const cors = require('cors');
const app = express();
let { getPool } = require('./utils/database');

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());


const checkDatabaseConnection = () => {
    return new Promise((resolve, reject) => {
        getPool().connect()
        .then((client) => {
            client.release();
            resolve();
        })
        .catch((err) => {
            reject(err);
        })
    })
}

checkDatabaseConnection()
.then(() => {
    console.log('Database connection established!');
})
.catch((err) => {
    console.error('Error connecting to Database');
    console.error(err);
});

const creditsRoute = require('./routes/getCredits');

app.use('/', creditsRoute);


const PORT = 9876;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}!`);
})

// module.exports = { getPool };
