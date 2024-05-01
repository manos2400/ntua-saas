const kafka = require('./kafka'); // Assuming you have your Kafka configuration in a file named kafkaConfig.js

const producer = kafka.producer();

//JUST TESTING

const produceMessages = async () => {
    try {
        await producer.connect();
        console.log('Producer connected to Kafka');
        
        await producer.send({
            topic: 'test-topic',
            messages: [
                { value: 'Hello Kafka!' },
                { value: 'This is a test message.' }
            ]
        });
        console.log('Messages sent successfully');

        await producer.disconnect();
        console.log('Producer disconnected from Kafka');
    } catch (error) {
        console.error('Error producing messages:', error);
    }
}

produceMessages();
