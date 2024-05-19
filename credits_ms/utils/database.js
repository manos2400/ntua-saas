const { Pool, Client } = require('pg');

const poolConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    connectionLimit: 100,
}

let poolInstance;

function getPool(){
    return poolInstance;
}

async function initDB() {
    const client = new Client(
        {
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            host: process.env.DB_HOST,
            port: 5432,
            database: process.env.DB_NAME,
        }
    );
    await client.connect();
    // Create table if it doesn't exist
    await client.query(`CREATE TABLE IF NOT EXISTS global_credits(credits_id SERIAL PRIMARY KEY, credits INTEGER);`);
    // Insert initial value if table is empty
    const result = await client.query(`SELECT * FROM global_credits`);
    if(result.rows.length === 0){
        await client.query(`INSERT INTO global_credits(credits) VALUES(100);`);
    }
    // await client.query(`INSERT INTO global_credits(credits) VALUES(100);`);
    await client.end();

    // Create pool
    poolInstance = new Pool(poolConfig);
}

async function checkConnection(){
    return new Promise((resolve, reject) => {
        getPool().connect()
            .then((client) => {
                client.release();
                resolve();
            })
            .catch((err) => {
                reject(err);
            })
    })
}

module.exports = { getPool, initDB, checkConnection };