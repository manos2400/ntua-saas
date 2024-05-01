const kafka = require('./kafka'); // Assuming you have your Kafka configuration in a file named kafkaConfig.js

const producer = kafka.producer();

exports.send_submition = async (sourcefile,type) => {
    try {
        if(type == 'metadata'){
            await producer.connect();
            await producer.send({
                topic: 'submit-queue',
                messages: [
                    { value: sourcefile[0] },
                    { value: sourcefile[1] },
                    { value: 'metadata' }
                ]
            });
            await producer.disconnect();
        }else{
            await producer.connect();
            await producer.send({
                topic: 'submit-queue',
                messages: [
                    //{ value: 'sending source file to be stored' },
                    { value: sourcefile },
                    { value: 'source file' }
    
                ]
            });
            await producer.disconnect();
        }

    } catch (error) {
        console.error('Error producing messages:', error);
    }
}

//produceMessages(); // for testing purposes
