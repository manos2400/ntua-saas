import KafkaClient from './utils/kafka';
import app from './utils/app';
import chalk from "chalk";
import 'dotenv/config';
import { database } from "./utils/database";
import {Problem, Status} from "./entities/problem.entity";
import {Dataset} from "./entities/dataset.entity";
import {Metadata} from "./entities/metadata.entity";

export const kafka = new KafkaClient();
const PORT = process.env.PORT || 4000;
database.initialize().then(async () => {
    console.info(chalk.blueBright('Database connected!'));
    app.listen(PORT, () => {
        console.info(chalk.blueBright('Server running on port ' + PORT));
    });
        await kafka.consume(['submit-queue', 'result-queue'], async (topic, message) => {
            if(topic === 'submit-queue') {
                // parse json message
                const submission = JSON.parse(message.value.toString());
                if (!submission) {
                    console.error(chalk.red('submit-queue: Message must be a valid JSON'));
                    return;
                }

                // Translate data from submit-ms
                const datasets = [{
                    name: submission.dataset_name,
                    description: submission.dataset_description,
                    data: submission.data,
                }]
                const solver = submission.solver_id === "1" ? "vrpSolver" : "Another solver";
                const metadata = [{
                    name: "num_vehicles",
                    type: "number",
                    value: submission.parameters[0].num_vehicles,
                    description: "Number of vehicles"
                }, {
                    name: "depot",
                    type: "string",
                    value: submission.parameters[1].depot,
                    description: "Starting index"
                }, {
                    name: "max_distance",
                    type: "number",
                    value: submission.parameters[2].max_distance,
                    description: "Maximum distance"
                }];

                const problem = database.getRepository(Problem).create({
                    id: submission.id,
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
                const {problemID} = JSON.parse(message.value.toString());
                if (!problemID) {
                    console.error(chalk.red('result-queue: Message must have problemID'));
                    return;
                }
                // get problem from database
                const problem = await database.getRepository(Problem).findOneBy({id: problemID});
                if (!problem) {
                    console.error(chalk.red(`result-queue: Problem with id ${problemID} not found`));
                    return;
                }
                if(problem.status !== Status.PENDING) {
                    console.error(chalk.red(`result-queue: Problem with id ${problemID} is not pending`));
                    return;
                }
                // update problem status
                problem.status = Status.SOLVED;
                await database.getRepository(Problem).save(problem);
                console.info(chalk.green('Result saved!'));
            }
        });
}).catch((error) => {
    console.error(chalk.red('Error: ' + error));
});