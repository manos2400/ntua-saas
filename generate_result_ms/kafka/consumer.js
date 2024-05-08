// kafka/consumer.js
const {insertSolverIntoDatabase} = require('../utils/add_solver_1.js')
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
                    console.log('Received message:', messageData);
                    if (messageData.type === 'metadata') {
                        add_metadata(messageData);
                    } else if (messageData.type === 'sourcefile') {

                        // TODO PROBABLY
                        // console.log("Data ", messageData.data);
                        // console.log("Type ", messageData.type);
                        // console.log("name ", messageData.name);
                        // console.log("description ", messageData.description);
                    }
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