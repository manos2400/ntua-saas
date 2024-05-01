const kafka = require('./kafka'); // Assuming you have your Kafka configuration in a file named kafkaConfig.js

// JUST TESTING PURPOSES SHOULD BE REMOVED ALLTOGETHER

const consumer = kafka.consumer({ groupId: 'test-group' });

const consumeMessages = async () => {
    try {
        await consumer.connect();
        console.log('Consumer connected to Kafka');

        await consumer.subscribe({ topic: 'submit-queue', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const fileContent = message.value.toString(); // Convert binary data to string
                const lines = fileContent.split('\n').slice(0, 5); // Get the first 5 lines
                console.log(lines);
            },
        });
    } catch (error) {
        console.error('Error consuming messages:', error);
    }
}

consumeMessages();
