import KafkaClient from './utils/kafka';
import app from './utils/app';
import chalk from "chalk";
import 'dotenv/config';
import { database } from "./utils/database";
import {Result} from "./entities/result.entity";

export const kafka = new KafkaClient();
const PORT = process.env.PORT || 3001;
database.initialize().then(async () => {
    console.info(chalk.blueBright('Database connected!'));
    app.listen(PORT, () => {
        console.info(chalk.blueBright('Server running on port ' + PORT));
    });
        await kafka.consume(['solved-problems', 'problem-delete'], async (topic, message) => {
            if(topic == 'solved-problems') {
                // parse json message
                const {problemID, output} = JSON.parse(message.value.toString());
                if (!problemID) {
                    console.error(chalk.red('solved-problems: Message must have problemID'));
                    return;
                }
                // Check if result already exists
                const result = await database.getRepository(Result).findOne({
                    where: { problem_id: problemID }
                });
                if (result) {
                    console.error(chalk.red(`solved-problems: Result already exists for problem with id ${problemID}`));
                    return;
                }
                // TODO: Format the output as needed
                // save to database
                const newResult = database.getRepository(Result).create({ problem_id: problemID, output });
                await database.getRepository(Result).save(newResult);
                console.info(chalk.green('New result saved!'));
                // Notify other microservices that the problem was solved
                const res = {
                    problemID: problemID,
                    output: output
                }
                await kafka.produce('result-queue', [{ value: JSON.stringify(res) }]);
            } else if (topic == 'problem-delete') {
                // parse json message
                const {id} = JSON.parse(message.value.toString());
                if (!id) {
                    console.info(chalk.red('problem-delete: Message must have an id'));
                    return;
                }
                // delete from database
                const result = await database.getRepository(Result).findOne({
                    where: { problem_id: id }
                });
                if (!result) {
                    console.info(chalk.red(`problem-delete: Result not found for problem with id ${id}`));
                    return;
                }
                await database.getRepository(Result).delete(result);
                console.info(chalk.green('Result deleted!'));
            }
        });
});