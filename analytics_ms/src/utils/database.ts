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

    for (let i = 0; i < 3; i++) {
        const solverindex = Math.floor(Math.random() * 3);
        const problem = database.getRepository(Problem).create({
            id: /*random 6 char string*/ "prob"+Math.random().toString(36).substring(2, 8),
            //description: `Random problem ${i}`,
            solver: `solver${solverindex}`,
            timestampStart: new Date().toISOString(),
            timestampEnd: /* random minutes later*/ new Date(Date.now() + Math.floor(Math.random() * 1000 * 60 * 60)).toISOString()
        });
        await database.getRepository(Problem).save(problem);
    }

}