const express = require('express');
const { Kafka } = require('kafkajs')
const cors = require('cors');
const app = express();
const router = express.Router();
const { pool } = require('./utils/database');
const { Client } = require('pg');

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());


const checkDatabaseConnection = () => {
    return new Promise((resolve, reject) => {
        pool.connect()
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


const kafka = new Kafka({
    clientId: 'Solver-App',
    brokers: ['kafka:9091', 'kafka2:9092'],
})

app.get('/retrieveCreditNum', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT credits FROM global_credits');
        const globalCreds = result.rows[0].credits;
        client.release();
        console.log(globalCreds);
        res.json({ globalCreds });
    } catch (error) {
        console.error('Error fetching global credits:', error);
        res.status(500).json({error: 'Internal server error'});
    }
})

//this establishes a route that passes the pool. 
// app.use('/route1', require('./routes/route1')(pool));
//this is the example route
// module.exports = function(pool) {
//     router.get('/', async (req, res) => {
//         try {
//             const client = await pool.connect();
//             const result = await client.query('SELECT * FROM table1');
//             res.json(result.rows);
//             client.release();
//         } catch (err) {
//             console.error('Error executing query:', err);
//             res.status(500).send('Internal Server Error');
//         }
//     });

//     return router;
//  app.use((req, res, next) => { res.status(404).json({ message: 'Endpoint Not Found' }) }); 

const PORT = 9876;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}!`);
})

