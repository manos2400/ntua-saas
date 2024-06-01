import KafkaClient from './utils/kafka';
import app from './utils/app';
import chalk from "chalk";
import { database, addDummyRecords } from "./utils/database";
import { Problem } from "./entities/problem.entity";
import { timeDiff, parseStats } from "./utils/analysis";

export const kafka = new KafkaClient();

const PORT = process.env.PORT || 4003;

database.initialize().then(async () => {
    console.info(chalk.blueBright('Database connected!'));

    //await addDummyRecords(); // temporary, for testing

    app.listen(PORT, () => {
        console.info(chalk.blueBright('Server running on port ' + PORT));
    });
    
    await kafka.consume(['submit-queue', 'problem-solved'], async (topic, message) => {
        if(topic === 'submit-queue') {
            /* save problem when it is submitted,
               because problem-solved will not have solver info

               also add timestampStart and timestampEnd for stats
            */
            // parse json message
            const submission = JSON.parse(message.value.toString());
            if (!submission) {
                console.error(chalk.red('submit-queue: Message must be a valid JSON'));
                return;
            }

            // save to database
            const problem = database.getRepository(Problem).create({
                id: submission.id,
                solver: submission.solver_id,
                submittedAt: new Date().toISOString(),
                solvedAt: "",
                execTime: 0,
                userTime: 0,
                sysTime: 0,
                memory: 0,
                memoryPeak: 0,
                timeAfterSubmission: 0
            });
            await database.getRepository(Problem).save(problem);
            console.log(chalk.green('New problem saved!'));
        } else if(topic === 'problem-solved') {

            // parse json message
            const {data, solver_id, id} = JSON.parse(message.value.toString());
            if (!id) {
                console.error(chalk.red('problem-solved: Message must have problemID'));
                return;
            }
            // get problem from database
            const problem = await database.getRepository(Problem).findOneBy({id: id});
            if (!problem) {
                console.error(chalk.red(`problem-solved: Problem with id ${id} not found`));
                return;
            }
            if(problem.solvedAt !== "") {
                console.error(chalk.red(`problem-solved: Problem with id ${id} is not pending`));
                return;
            }
            // update timestampEnd (we dont need status, if timestampEnd is set, it is solved)
            problem.solvedAt = new Date().toISOString();
            problem.timeAfterSubmission = timeDiff(problem.submittedAt, problem.solvedAt);
            const stats = parseStats(data);
            problem.execTime = stats.execTime;
            problem.userTime = stats.userTime;
            problem.sysTime = stats.sysTime;
            problem.memory = stats.memory;
            problem.memoryPeak = stats.memoryPeak;
            
            await database.getRepository(Problem).save(problem);
            console.info(chalk.green('Result saved!'));
        }
    });

}).catch((error) => {
    console.error(chalk.red('Error: ' + error));
});
