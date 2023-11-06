import express, { Express } from "express";
import cors from "cors";

import router from "./routes/index.js";
import database from "./database/db_config.js";

// Connecting to db
database.sync({ alter: true })
    .then(() => {
        console.log("Synced to the database.");
    })
    .catch((err) => {
        console.log("Failed to sync database: " + err.message);
    });

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(`${process.env.URL_PREFIX}`, router);

export default app;