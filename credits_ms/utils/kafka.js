const { Kafka } = require('kafkajs');
const { getPool } = require('./database');

class KafkaClient {
    constructor(){
        this.kafka = new Kafka({
            clientId: 'credits_ms',
            brokers: [`${process.env.KAFKA_BROKER}`]
        });
        this.consumer = this.kafka.consumer({groupId: 'credits_group'});
        this.producer = this.kafka.producer();
    }

    async subscribe(topic){
        await this.consumer.connect();
        await this.consumer.subscribe({ topic: topic, fromBeginning: true });
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const client = await getPool().connect();
                const result = await client.query('SELECT credits FROM global_credits');
                const globalCreds = result.rows[0].credits;
                if(globalCreds >= 10){
                    await client.query('UPDATE global_credits SET credits = credits-10');
                    await client.release();
                    await this.producer.connect();
                    await this.producer.send({
                        topic: 'credits_charge',
                        messages: [
                            {key: 'key1', value: 'charged', partition: 0}
                        ]
                    })
                    await this.producer.disconnect();
                } else {
                    await client.release();
                    await this.producer.connect();
                    await this.producer.send({
                        topic: 'credits_charge',
                        messages: [
                            {key: 'key1', value: 'no_credits', partition: 0}
                        ]
                    })
                    await this.producer.disconnect();
                }
            }
        })
    }
}

module.exports = KafkaClient;