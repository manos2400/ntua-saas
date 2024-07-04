const { Kafka, Partitioners} = require('kafkajs');
const { getPool } = require('./database');

class KafkaClient {
    constructor(){
        this.kafka = new Kafka({
            clientId: 'credits_ms',
            brokers: [`${process.env.KAFKA_BROKER}`]
        });
        this.consumer = this.kafka.consumer({groupId: 'credits_group'});
        this.producer = this.kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
    }


    async subscribe(topic){
        await this.consumer.connect();
        await this.consumer.subscribe({ topic: topic, fromBeginning: true });
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const client = await getPool().connect();
                await client.query('UPDATE global_credits SET credits = credits-10');
                await client.release();        
                }
            })
    }
}

module.exports = KafkaClient;