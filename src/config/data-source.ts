import { DataSource } from "typeorm";
import { config } from 'dotenv';
import dbConfig from "./db.config.js";
import {Lottery} from "../models/lottery.js";
import {Ticket} from "../models/ticket.js";

config();

export const db = new DataSource({
    type: "mysql",
    host: dbConfig.HOST,
    port: process.env.MYSQL_PORT as unknown as number || dbConfig.PORT,
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE,
    synchronize: true,
    logging: false,
    entities: [Lottery, Ticket],
    subscribers: [],
    migrations: [],
});

export async function initialize_typeorm(db: DataSource) {
    try {
        await db.initialize();
        console.log("Data Source has been initialized!");
    } catch (err) {
        console.error("Error during Data Source initialization:", err);
    }
}