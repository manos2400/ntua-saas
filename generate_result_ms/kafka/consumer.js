const {add_metadata} = require('../utils/add_metadata.js')
const kafka = require('./kafka');

const consumer = kafka.consumer({ groupId: 'problem-group' });

async function init(){
    try {
        await consumer.connect();
        console.log('Consumer connected to Kafka');

        await consumer.subscribe({ topic: 'submit-queue', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log('Received message from Kafka:');
                try {
                    const messageData = JSON.parse(message.value.toString());
                    console.log('Received new problem');
                    add_metadata(messageData);
                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            },
        });
    } catch (error) {
        console.error('Error consuming messages:', error);
    }
}

module.exports = { init };