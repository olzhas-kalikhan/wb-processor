import "dotenv/config";
import { type Knex } from "knex";

export type Environment = "development" | "production";

const config: Record<Environment, Knex.Config> = {
    development: {
        client: "postgresql",
        connection: {
            host: "127.0.0.1",
            port: 5432,
            user: process.env.PG_USER,
            database: process.env.PG_DATABASE,
            password: process.env.PG_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
            extension: "ts",
        },
    },

    production: {
        client: "postgresql",
        connection: {
            host: "db",
            /** Todo:change to prod values */
            port: 5432,
            user: process.env.PG_USER,
            database: process.env.PG_DATABASE,
            password: process.env.PG_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};

export default config;
