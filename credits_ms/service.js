const KafkaClient = require('./utils/kafka');
const db = require('./utils/database');
const app = require('./utils/server');
require('dotenv').config()

// Initialize the database
db.initDB().then(r =>  {
        console.log('DB initialized');
        // Test DB connection
        db.checkConnection()
            .then(() => {
                console.info('Database connection established!');
            })
            .catch((err) => {
                console.error('Error connecting to Database');
                console.error(err);
                return process.exit(1);
            });
    }
    )
    .catch(e => {
        console.error('Error initializing DB', e);
        return process.exit(1);
    });

// Initialize Kafka client
const kafkaClient = new KafkaClient();
kafkaClient.subscribe('test_creds')
    .then(r => console.info('Subscribed to test-credits topic'))
    .catch(e => {
        console.error('Error subscribing to test-credits topic', e);
        return process.exit(1);
    });

// Start the server
const PORT = process.env.PORT || 4004;

app.listen(PORT, () => {
    console.info(`🚀 Server running on port ${PORT}!`);
})