import knex from "knex";
import knexfile, { type Environment } from "../../knexfile.js";

const dbConnection = knex(knexfile[process.env.NODE_ENV as Environment]);

export default dbConnection;
