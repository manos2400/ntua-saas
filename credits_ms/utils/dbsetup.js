const { Client, Pool } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '123',
    port: 5432
});


const dbsetup = async () => {

    try {
        await client.connect()
    
        console.log('Connecting to Postgres successful');
    
        DB_NAME = 'credits_storage';
        const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${DB_NAME}'`);
        
        if (res.rowCount === 0) {
            console.log(`${DB_NAME} database not found, creating it.`);
            await client.query(`CREATE DATABASE "${DB_NAME}";`);
        } else {
            console.log(`${DB_NAME} database exists.`);
        }    
 
    } catch (error) {
        console.log('Error: ', err);
    }
    

    await client.end();
    
    const client2 = new Client({
        user: 'postgres',
        host: 'localhost',
        password: '123',
        database: 'credits_storage',
        port: 5432
    });
    
    try {
        await client2.connect()
    
        console.log('Using Credits database');
        const res = await client2.query(`SELECT EXISTS(SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'global_credits');`);
        
        if (!res.rows[0].exists) {
            console.log('Creating table');
            await client2.query('CREATE TABLE global_credits(credits_id SERIAL PRIMARY KEY, credits INTEGER);');
            console.log('Table created');
            
        } else {
            console.log('Table exists');
        }    
    
    
        await client2.query('INSERT INTO global_credits (credits) VALUES (100);');
        console.log('All done!');
    } catch (error) {
        console.log('Error creating database: ', error);
    }
    
   await client2.end();
}



dbsetup();
