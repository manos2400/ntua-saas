const kafka = require('./kafka'); // Assuming you have your Kafka configuration in a file named kafkaConfig.js

// JUST TESTING


const consumer = kafka.consumer({ groupId: 'test-group' });

const consumeMessages = async () => {
    try {
        await consumer.connect();
        console.log('Consumer connected to Kafka');

        await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    topic,
                    partition,
                    offset: message.offset,
                    value: message.value.toString(),
                });
            },
        });
    } catch (error) {
        console.error('Error consuming messages:', error);
    }
}

consumeMessages();
