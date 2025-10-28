import pg, { Pool } from 'pg';
import 'dotenv/config'

var pool;

export function ConnectToDbAndReturnPoll()
{
    if (pool != undefined) return pool
    pool = new pg.Pool({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        options: `-c search_path=ecommerce,public`
    })

    return pool
}