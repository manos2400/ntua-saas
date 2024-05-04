// kafka/consumer.js
const {insertSolverIntoDatabase} = require('../utils/add_solver_1.js')
const {add_metadata} = require('../utils/add_metadata.js')
const kafka = require('./kafka');

// function init() {
//     const Consumer = kafka.Consumer;
//     const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
//     const consumer = new Consumer(client, [{ topic: 'submit-queue', partition: 0 }], {
//         autoCommit: true
//     });

//     // Handle Kafka messages
//     consumer.on('message', function (message) {
//         const message_json = JSON.parse(message.value.toString())
//         if(message.type == 'metadata'){
//             console.log("Data " ,message_json.data)
//             console.log("Solver ID ",message_json.solver_id)
//             console.log("Type ",message_json.type)
//             add_metadata(message_json)
//         // Process the message and send the results back to the frontend
//         }else if(message.type == 'sourcefile'){
//             console.log("Data " ,message.data)
//             console.log("Type ",message.type)
//             console.log("name " ,message.name)
//             console.log("description " ,message.description)   
//             console.log('Received message from Kafka:', message);
//         }
//     });

//     consumer.on('error', function (error) {
//         console.error('Kafka consumer error:', error);
//     });
// }
 // Assuming you have your Kafka configuration in a file named kafkaConfig.js

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
                        console.log("Data ", messageData.data);
                        console.log("Solver ID ", messageData.solver_id);
                        console.log("Type ", messageData.type);
                        add_metadata(messageData);
                    } else if (messageData.type === 'sourcefile') {
                        console.log("Data ", messageData.data);
                        console.log("Type ", messageData.type);
                        console.log("name ", messageData.name);
                        console.log("description ", messageData.description);
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