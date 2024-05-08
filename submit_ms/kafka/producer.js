const kafka = require('./kafka'); // Assuming you have your Kafka configuration in a file named kafkaConfig.js

const producer = kafka.producer();

exports.send_submition = async (sourcefile,type) => {
    try {
        if (type === 'metadata') {
            await producer.connect();
            const messageData = JSON.parse(sourcefile[0].toString())
            const message = {
                data: messageData,
                solver_id: sourcefile[1],
                dataset_name: sourcefile[2],
                dataset_description: sourcefile[3],
                type: 'metadata'
            };
            await producer.send({
                topic: 'submit-queue',
                messages: [{ value: JSON.stringify(message) }]
            });
            await producer.disconnect();
        }
        
        else{
            await producer.connect();
            const messageData = sourcefile.toString();
            const message = {
                data: messageData,
                type: 'sourcefile'
            };
            await producer.send({
                topic: 'submit-queue',
                messages:[{ value: JSON.stringify(message) }]
            });
            await producer.disconnect();
        }

    } catch (error) {
        console.error('Error producing messages:', error);
    }
}

//produceMessages(); // for testing purposes
