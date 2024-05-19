
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientID: 'problem_handle',
    brokers: [`${process.env.KAFKA_BROKER}`], // assuming Kafka is running locally on the default port
    ssl: false // assuming SSL is not enabled in your local setup
});

module.exports = kafka;