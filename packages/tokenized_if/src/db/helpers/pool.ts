import { Pool } from 'pg';

import dotenv from "dotenv";

// Load .env variables in process.env
dotenv.config();

const pool = new Pool({
    user: process.env.APP_DB_USER,
    password: process.env.APP_DB_PASS,
    database: process.env.APP_DB_NAME,
    host: 'postgres',
    port: parseInt(process.env.POSTGRES_PORT),
    connectionString: `postgres://root:password@localhost:5432/${process.env.APP_DB_NAME}`
});

export default pool;
