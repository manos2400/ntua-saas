
// const kafka = require('./kafka'); // Assuming you have your Kafka configuration in a file named kafkaConfig.js
// const messageQueue = require('./message_queue.js');
// const consumer = kafka.consumer({ groupId: 'problem-group' });

// exports.consume_credits = async () => {
//     try {
//         await consumer.connect();
//         console.log('Consumer connected to Kafka');

//         await consumer.subscribe({ topic: 'credits_charge', fromBeginning: true });

//         await consumer.run({
//             eachMessage: async ({ topic, partition, message }) => {
//                 console.log('Received message from Kafka:');
//                 try {
//                     const messageData = JSON.parse(message.value.toString());
//                     console.log('Received message:', messageData);
//                     messageQueue.enqueue(messageData);
//                     return true;
//                 } catch (error) {
//                     console.error('Error parsing message:', error);
//                     return false;
//                 }   
//             },
//         });
//     } catch (error) {
//         console.error('Error consuming messages:', error);
//         return false;
//     }
// }


