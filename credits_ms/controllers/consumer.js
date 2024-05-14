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

const producer = kafka.producer();


const run = async () => {

    await consumer.connect();

    await consumer.subscribe({ topic: 'test_creds', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const client = await getPool().connect();
            const result = await client.query('SELECT credits FROM global_credits');
            const globalCreds = result.rows[0].credits;
            if(globalCreds >= 10){
                await client.query('UPDATE global_credits SET credits = credits-10');
                await client.release();
                await producer.connect();
                await producer.send({
                    topic: 'credits_charge',
                    messages: [
                        {key: 'key1', value: 'charged', partition: 0}
                    ]
                })
                await producer.disconnect();
            }
            else{
                await client.release();
                await producer.connect();
                await producer.send({
                    topic: 'credits_charge',
                    messages: [
                        {key: 'key1', value: 'no_credits', partition: 0}
                    ]
                })
                await producer.disconnect();
            }
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