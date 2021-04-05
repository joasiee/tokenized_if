import { Pool } from 'pg';

function createDatabaseConfig() {
    const user = process.env.POSTGRES_USER;
    const pass = process.env.POSTGRES_PASSWORD;
    const name = process.env.POSTGRES_DB;
    const port = process.env.POSTGRES_PORT;
    return { connectionString: `postgres://${user}:${pass}@localhost:${port}/${name}$` };
}
const databaseConfig = createDatabaseConfig();
const pool = new Pool(databaseConfig);

export default pool;