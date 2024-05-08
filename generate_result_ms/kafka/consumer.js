// kafka/consumer.js
const {insertSolverIntoDatabase} = require('../utils/add_solver_1.js')
const {add_metadata} = require('../utils/add_metadata.js')
const kafka = require('./kafka');
const fs = require('fs');

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
                        console.log(messageData);
                        add_metadata(messageData);
                    } else if (messageData.type === 'sourcefile') {
                        const messageData = JSON.parse(message.value.toString());
                        const fileName = `./solvers/${messageData.name}.${messageData.extension}`;
                        const fileContent = messageData.data;
                        fs.writeFile(fileName, fileContent, (err) => {
                            if (err) {
                                console.error('Error creating file:', err);
                            } else {
                                console.log(`File ${fileName} created successfully.`);
                            }
                        });
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