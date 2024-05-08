const { Pool } = require('pg');

const poolConfig = {
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    password: '123',
    database: 'credits_storage',
    connectionLimit: 100,
}

let poolInstance;

function getPool(){
    if(!poolInstance){
        poolInstance = new Pool(poolConfig);
    }
    return poolInstance;
}

module.exports = { getPool };