const kafka = require('./kafka');
const { Partitioners } = require('kafkajs');
const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });

exports.send_submission = async (sourcefile) => {
    try {
            await producer.connect();
            const messageData = JSON.parse(sourcefile[0].toString())
            const message = {
                data: messageData,
                solver_id: sourcefile[1],
                dataset_name: sourcefile[2],
                dataset_description: sourcefile[3],
                id: sourcefile[4],
                parameters : [{num_vehicles:sourcefile[5]},{depot:sourcefile[6]},{max_distance:sourcefile[7]}],
                type: 'metadata'
            };
            await producer.send({
                topic: 'submit-queue',
                messages: [{ value: JSON.stringify(message) }]
            });
            await producer.disconnect();

    } catch (error) {
        console.error('Error producing messages:', error);
    }
}

exports.request_credits = async () => {
    console.log("Requesting credits")
    await producer.connect();
    await producer.send({
        topic: 'test_creds',
        messages: [
            { value: 'check_credits' }
          ]
    });
    await producer.disconnect();
}

//produceMessages(); // for testing purposes
