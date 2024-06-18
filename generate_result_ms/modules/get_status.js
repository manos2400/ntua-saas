const os = require('os');
const kafka = require('../kafka/kafka.js'); // Assuming you have your Kafka configuration in a file named kafkaConfig.js

exports.get_status = async (req, res, next) => {
    try {
        const hostname = os.hostname();
        const currentDate = new Date().toISOString();
        let kafkaStatus = 'Disconnected';

        // Check if the Kafka producer is connected
        if (kafka.producer && kafka.producer.connected) {
            kafkaStatus = 'Connected';
        }

        const serverInfo = {
            hostname: hostname,
            currentDateTime: currentDate,
            kafkaStatus: kafkaStatus,
            message: 'Server is running okay'
        };
        res.status(200).json(serverInfo);
    } catch (error) {
        console.error('Error checking server status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
