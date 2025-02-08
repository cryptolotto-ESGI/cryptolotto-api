import { DataSource } from "typeorm";
import { config } from 'dotenv';
import {Lottery} from "../models/lottery.js";
import {Ticket} from "../models/ticket.js";

config();

export const db = new DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: false,
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