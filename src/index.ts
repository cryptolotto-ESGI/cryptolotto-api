import "reflect-metadata";
import express from "express";
import { config } from "dotenv";
import {db, initialize_typeorm} from "./config/data-source.js";
import lotteryRoutes from "./routes/lottery-routes.js";

config();

const PORT = process.env.APP_PORT || 3000;

export async function startServer() {
    try {
        const app = express();
        app.use(express.json());

        app.use('/lotteries', lotteryRoutes);

        await initialize_typeorm(db);
        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}/`);
        });

    } catch (error) {
        console.error("Error starting the server:", error);
    }
}

startServer().catch((error) => console.error("Unexpected error:", error));
