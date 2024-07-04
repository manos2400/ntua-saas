const kafka = require('./kafka');
const { Partitioners } = require('kafkajs');
const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });

exports.send_solution = async (result_stuff,solverid,metadataid) => {
    try {
        await producer.connect();
        const message = {
            data: result_stuff.toString(),
            solver_id: solverid,
            id : metadataid,
        };
        await producer.send({
            topic: 'problem-solved',
            messages: [{ value: JSON.stringify(message) }]
        });
        await producer.disconnect();
        console.log("Sent solution to kafka")

    } catch (error) {
        console.error('Error producing messages:', error);
    }
}
