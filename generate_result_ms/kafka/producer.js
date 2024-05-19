const kafka = require('./kafka'); // Assuming you have your Kafka configuration in a file named kafkaConfig.js

const producer = kafka.producer();

exports.send_solution = async (result_stuff,solverid,metadataid,numVehicles,depot,maxDistance) => {
    try {
        await producer.connect();
        //const messageData = JSON.parse(sourcefile[0].toString())
        const message = {
            data: result_stuff.toString(),
            solver_id: solverid,
            id : metadataid,
        };
        await producer.send({
            topic: 'resultqueue',
            messages: [{ value: JSON.stringify(message) }]
        });
        await producer.disconnect();
        console.log("Sent solution to kafka")

    } catch (error) {
        console.error('Error producing messages:', error);
    }
}
