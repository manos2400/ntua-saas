import { DataSource } from "typeorm";
import { Problem } from "../entities/problem.entity";
import { Result } from "../entities/result.entity";
export const database: DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "saas",
    password: "saas2024",
    database: "problems-ms-db",
    entities: [Problem, Result],
    synchronize: true,
})