import KafkaClient from './utils/kafka';
import app from './utils/app';
import chalk from "chalk";
import { database } from "./utils/database";
import {Problem} from "./entities/problem.entity";
import {Result} from "./entities/result.entity";

const kafka = new KafkaClient();

database.initialize().then(async () => {
    console.log(chalk.blueBright('Database connected!'));
    app.listen(3000, () => {
        console.log(chalk.blueBright('Server running on port 3000'));
    });
        await kafka.consume(['problems.submit', 'problems.result'], async (topic, message) => {
            if(topic === 'problems.submit') {
                // parse json message
                const {description, solver, data, args} = JSON.parse(message.value.toString());
                if (!description || !solver || !data || !args) {
                    console.error(chalk.red('problems.submit: Message must have description, solver, data and args'));
                    return;
                }
                // save to database
                const problem = database.getRepository(Problem).create({
                    description,
                    solver,
                    pending: true,
                    data,
                    args
                });
                await database.getRepository(Problem).save(problem);
                console.log(chalk.green('New problem saved!'));
            } else if(topic === 'problems.result') {
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
                if(!problem.pending) {
                    console.error(chalk.red(`problems.result: Problem with id ${problemID} is not pending`));
                    return;
                }
                // update problem in database
                problem.pending = false;
                const result = database.getRepository(Result).create({ output, problem: { id: problemID } });
                await database.getRepository(Result).save(result);
                await database.getRepository(Problem).save(problem);
                console.log(chalk.green('Result saved!'));
            }
        });
})