import {Consumer, Kafka, Partitioners, Producer} from 'kafkajs';
import chalk from "chalk";
import 'dotenv/config';

export default class KafkaClient {
    private client: Kafka;
    private producer: Producer;
    private consumer: Consumer;
    constructor() {
        this.client = new Kafka({
            clientId: 'results-ms',
            brokers: [`${process.env.KAFKA_BROKER}`],
        });
        this.producer = this.client.producer({ createPartitioner: Partitioners.LegacyPartitioner});
        this.consumer = this.client.consumer({ groupId: 'result-group' });
    }

    async produce(topic: string, messages: any[]) {
        await this.producer.connect();
        await this.producer.send({
            topic,
            messages
        });
        await this.producer.disconnect();
    }

    async consume(topics: string[], callback: (topic: string, message: any) => void) {
        await this.consumer.connect();
        await this.consumer.subscribe({ topics: topics });
        console.log(chalk.blueBright(`Consuming messages from topic: ${topics}`));
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                callback(topic, message);
            }
        });
    }
}
