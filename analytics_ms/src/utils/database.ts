import { DataSource } from "typeorm";
import { Problem } from "../entities/problem.entity";

export const database: DataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Problem],
    synchronize: true
})

// Function to add dummy records to the database
export const addDummyRecords = async () => {

    for (let i = 0; i < 2; i++) {
        const solverindex = Math.floor(Math.random() * 2);

        // random date in yyyy-mm-dd hh:mm:ss format
        const date1 = new Date().toISOString()
        const timeAfterSubmission = Math.random() * (0.9 - 0.01) + 0.01;
        const date2 = new Date(Date.now() + timeAfterSubmission).toISOString();



        const problem = database.getRepository(Problem).create({
            id: /*random 6 char string*/ "prob"+Math.random().toString(36).substring(2, 8),
            //description: `Random problem ${i}`,
            solver: `solver${solverindex}`,
            submittedAt: date1,
            solvedAt: date2,
            execTime: /*random decimal between 0.01 and 0.9*/ Math.random() * (0.9 - 0.01) + 0.01,
            userTime: 0.123456789123456789,
            sysTime: Math.random() * (0.9 - 0.01) + 0.01,
            memory: Math.random() * (0.9 - 0.01) + 0.01,
            memoryPeak: Math.random() * (0.9 - 0.01) + 0.01,
            timeAfterSubmission: timeAfterSubmission
        });
        await database.getRepository(Problem).save(problem);
    }

}