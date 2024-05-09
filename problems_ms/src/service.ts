import KafkaClient from './utils/kafka';
import app from './utils/app';
import chalk from "chalk";
import 'dotenv/config';
import { database } from "./utils/database";
import {Problem, Status} from "./entities/problem.entity";
import {Result} from "./entities/result.entity";
import {Dataset} from "./entities/dataset.entity";
import {Metadata} from "./entities/metadata.entity";

export const kafka = new KafkaClient();
const PORT = process.env.PORT || 3000;
database.initialize().then(async () => {
    console.log(chalk.blueBright('Database connected!'));
    app.listen(PORT, () => {
        console.log(chalk.blueBright('Server running on port ' + PORT));
    });
        await kafka.consume(['submit-queue', 'result-queue'], async (topic, message) => {
            if(topic === 'submit-queue') {
                // parse json message
                const {datasets, metadata, solver, description} = JSON.parse(message.value.toString());
                if (!description || !solver || !datasets || !metadata) {
                    console.error(chalk.red('problems.submit: Message must have description, solver, dataset and metadata'));
                    return;
                }
                // save to database
                const problem = database.getRepository(Problem).create({
                    description,
                    solver,
                    status: Status.PENDING,
                    datasets: datasets.map((dataset: { name: string, data: string }) => {
                        return database.getRepository(Dataset).create(dataset);
                    }),
                    metadata: metadata.map((metadata: { name: string, type: string, value: string, description: string }) => {
                        return database.getRepository(Metadata).create(metadata);
                    })
                });
                await database.getRepository(Problem).save(problem);
                console.log(chalk.green('New problem saved!'));
            } else if(topic === 'result-queue') {
                // parse json message
                const {problemID, output} = JSON.parse(message.value.toString());
                if (!problemID) {
                    console.error(chalk.red('problems.result: Message must have problemID'));
                    return;
                }
                // get problem from database
                const problem = await database.getRepository(Problem).findOneBy({id: problemID});
                if (!problem) {
                    console.error(chalk.red(`problems.result: Problem with id ${problemID} not found`));
                    return;
                }
                if(problem.status !== Status.PENDING) {
                    console.error(chalk.red(`problems.result: Problem with id ${problemID} is not pending`));
                    return;
                }
                // update problem in database
                problem.status = Status.SOLVED;
                const result = database.getRepository(Result).create({ output, problem: { id: problemID } });
                await database.getRepository(Result).save(result);
                await database.getRepository(Problem).save(problem);
                console.log(chalk.green('Result saved!'));
            }
        });
})