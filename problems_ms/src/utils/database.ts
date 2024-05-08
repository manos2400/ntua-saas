import { DataSource } from "typeorm";

export const database: DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "saas",
    password: "saas2024",
    database: "problems-ms-db",
    entities: [__dirname + '/entities/*.entity.{ts,js}'],
    synchronize: true
})