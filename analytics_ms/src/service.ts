import KafkaClient from './utils/kafka';
import app from './utils/app';
import chalk from "chalk";
import { database, addDummyRecords } from "./utils/database";
import { Problem } from "./entities/problem.entity";

/* new file*/ 

export const kafka = new KafkaClient();

const PORT = process.env.PORT || 3002;

database.initialize().then(async () => {
    console.info(chalk.blueBright('Database connected!'));

    await addDummyRecords(); // temporary, for testing

    app.listen(PORT, () => {
        console.info(chalk.blueBright('Server running on port ' + PORT));
    });
    
    await kafka.consume(['submit-queue', 'solved-problems-queue'], async (topic, message) => {
        if(topic === 'submit-queue') {
            /* save problem when it is submitted,
               because solved-problems-queue will not have solver info

               also add timestampStart and timestampEnd to measure execution time
            */
            // parse json message
            const {datasets, metadata, solver, description} = JSON.parse(message.value.toString());
            if (!description || !solver || !datasets || !metadata) {
                console.error(chalk.red('submit-queue: INVALID PROBLEM - Messages must have description, solver, at least one dataset and metadata'));
                return;
            }
            // save to database
            const problem = database.getRepository(Problem).create({
                description, // save description for better readability
                solver,
                timestampStart: new Date().toISOString(),
                timestampEnd: "",
                output: ""
            });
            await database.getRepository(Problem).save(problem);
            console.log(chalk.green('New problem saved!'));
        } else if(topic === 'solved-problems-queue') {

            // parse json message
            const {problemID, output} = JSON.parse(message.value.toString());
            if (!problemID) {
                console.error(chalk.red('solved-problems: Message must have problemID'));
                return;
            }
            // get problem from database
            const problem = await database.getRepository(Problem).findOneBy({id: problemID});
            if (!problem) {
                console.error(chalk.red(`solved-problems: Problem with id ${problemID} not found`));
                return;
            }
            if(problem.timestampEnd !== "") {
                console.error(chalk.red(`solved-problems: Problem with id ${problemID} is not pending`));
                return;
            }
            // update timestampEnd (we dont need status, if timestampEnd is set, it is solved)
            problem.timestampEnd = new Date().toISOString();
            problem.output = output;
            await database.getRepository(Problem).save(problem);
            console.info(chalk.green('Result saved!'));
        }
    });

}).catch((error) => {
    console.error(chalk.red('Error: ' + error));
});