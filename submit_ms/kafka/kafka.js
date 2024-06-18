
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientID: 'problem_submit',
    brokers:  [`${process.env.KAFKA_BROKER}`], //['localhost:9092'],
    ssl: false // assuming SSL is not enabled in your local setup
});

module.exports = kafka;