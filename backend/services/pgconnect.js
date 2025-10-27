import pg, { Pool } from 'pg';
import 'dotenv/config'

export function ConnectToDbAndReturnPoll()
{
    const client = new pg.Pool({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    })

    return client
}