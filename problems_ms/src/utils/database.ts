import { DataSource } from "typeorm";
import { Problem } from "../entities/problem.entity";
import { Dataset } from "../entities/dataset.entity";
import { Metadata } from "../entities/metadata.entity";
import 'dotenv/config';

export const database: DataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Problem, Dataset, Metadata],
    synchronize: true
})