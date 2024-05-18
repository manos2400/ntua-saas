//JUST TESTING

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientID: 'problem_handle',
    brokers: ['localhost:9092'], // assuming Kafka is running locally on the default port
    ssl: false // assuming SSL is not enabled in your local setup
});

module.exports = kafka;