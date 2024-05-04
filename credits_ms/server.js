const express = require('express');
const { Kafka } = require('kafkajs')
const cors = require('cors');
const {Pool} = require('pg');
const app = express();
const router = express.Router();

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());


const pool = new Pool({
    user: '',
    host: '',
    database: '',
    port: 5432,
});

const kafka = new Kafka({
    clientId: 'Solver-App',
    brokers: ['kafka:9091', 'kafka2:9092'],
})

router.get('/retrieveCreditNum', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT credits FROM global_credits');
        const globalCreds = result.rows[0].credits;
        client.release();
        res.json({ globalCreds });
    } catch (error) {
        console.error('Error fetching global credits:', error);
        res.status(500).json({error: 'Internal server error'});
    }
})
