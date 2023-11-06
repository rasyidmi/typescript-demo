import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { Sequelize } from "sequelize";

const dbUri = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const database = new Sequelize(dbUri);

export default database;