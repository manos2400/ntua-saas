const { Pool } = require('pg');

const poolConfig = {
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    password: '123',
    database: 'credits_storage',
    connectionLimit: 100,
}

const pool = new Pool(poolConfig);


module.exports = { pool };