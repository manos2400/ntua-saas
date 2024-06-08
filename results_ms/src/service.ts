import KafkaClient from './utils/kafka';
import app from './utils/app';
import chalk from "chalk";
import 'dotenv/config';
import { database } from "./utils/database";
import {Result} from "./entities/result.entity";
import formatOutput from "./utils/formatOutput";

export const kafka = new KafkaClient();
const PORT = process.env.PORT || 3001;
database.initialize().then(async () => {
    console.info(chalk.blueBright('Database connected!'));
    app.listen(PORT, () => {
        console.info(chalk.blueBright('Server running on port ' + PORT));
    });
        await kafka.consume(['problem-solved', 'problem-deleted'], async (topic, message) => {
            if(topic == 'problem-solved') {
                // parse json message
                const {id, data} = JSON.parse(message.value.toString());
                if (!id) {
                    console.error(chalk.red('problem-solved: Message must have problemID'));
                    return;
                }
                // Check if result already exists
                const result = await database.getRepository(Result).findOne({
                    where: { problem_id: id }
                });
                if (result) {
                    console.error(chalk.red(`problem-solved: Result already exists for problem with id ${id}`));
                    return;
                }
                // format output
                let formattedResult;
                if(data.startsWith('No solution')) {
                    formattedResult = {
                        status: "No solution found"
                    };
                } else {
                    formattedResult = formatOutput(data);
                }
                // save to database
                const newResult = database.getRepository(Result).create({
                        problem_id: id,
                        output: JSON.stringify(formattedResult)
                    });
                await database.getRepository(Result).save(newResult);
                console.info(chalk.green('New result saved!'));
                // Notify other microservices that the problem was solved
                await kafka.produce('result-queue', [{ value: JSON.stringify({problemID: id}) }]);
            } else if (topic == 'problem-deleted') {
                // parse json message
                const {id} = JSON.parse(message.value.toString());
                if (!id) {
                    console.info(chalk.red('problem-deleted: Message must have an id'));
                    return;
                }
                // delete from database
                const result = await database.getRepository(Result).findOne({
                    where: { problem_id: id }
                });
                if (!result) {
                    console.info(chalk.red(`problem-deleted: Result not found for problem with id ${id}`));
                    return;
                }
                await database.getRepository(Result).delete(result);
                console.info(chalk.green('Result deleted!'));
            }
        });
}).catch((error) => {
    console.error(chalk.red('Error: ' + error));
});