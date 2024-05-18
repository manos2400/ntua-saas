const kafka = require('./kafka'); // Assuming you have your Kafka configuration in a file named kafkaConfig.js

const producer = kafka.producer();

producer.connect().then(() => {
    console.log('Kafka producer connected');
}).catch(error => {
    console.error('Error connecting to Kafka producer:', error);
});

exports.send_submition = async (sourcefile,type) => {
    try {
        if (type === 'metadata') {
            //await producer.connect();
            const messageData = JSON.parse(sourcefile[0].toString())
            const message = {
                data: messageData,
                solver_id: sourcefile[1],
                dataset_name: sourcefile[2],
                dataset_description: sourcefile[3],
                metadata_id: sourcefile[4],
                num_vehicles: sourcefile[5],
                depot: sourcefile[6],
                max_distance: sourcefile[7],
                type: 'metadata'
            };
            await producer.send({
                topic: 'submit-queue',
                messages: [{ value: JSON.stringify(message) }]
            });
            //await producer.disconnect();
        }
        
        else{
            //await producer.connect();
            const messageData = sourcefile[0].toString();
            const message = {
                data: messageData,
                name: sourcefile[1],
                extension: sourcefile[2],
                type: 'sourcefile'
            };
            await producer.send({
                topic: 'submit-queue',
                messages:[{ value: JSON.stringify(message) }]
            });
            //await producer.disconnect();
        }

    } catch (error) {
        console.error('Error producing messages:', error);
    }
}

exports.request_credits = async () => {
    console.log("Requesting credits")
    //await producer.connect();
    await producer.send({
        topic: 'test_creds',
        messages: [
            { value: 'check_credits' }
          ]
    });
    //await producer.disconnect();
}

//produceMessages(); // for testing purposes
