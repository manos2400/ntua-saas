// const { kafka } = require('./kafka');
const express = require('express');
const { Kafka } = require('kafkajs');
const { getPool } = require('../utils/database');

const app = express();

const kafka = new Kafka({
    clientId: 'credits_ms',
    brokers: ['localhost:9092']
});

const consumer = kafka.consumer({groupId: 'credits_group'});


const run = async () => {

    await consumer.connect();

    await consumer.subscribe({ topic: 'test_creds', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const client = await getPool().connect();
            await client.query('UPDATE global_credits SET credits = credits-10');
            await client.release();
        }
    })
}

run().catch(err => console.error(err));

const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

signalTraps.forEach(type => {
    process.once(type, async () => {
        try {
            await consumer.disconnect();
        } finally{
            process.kill(process.pid, type);
        }
    })
})

const PORT = 9875;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}!`);
})