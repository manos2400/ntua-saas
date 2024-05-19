const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('../data/mydatabase.db',  sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the database.');
    }

});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Solver (
        solver_id INTEGER PRIMARY KEY,
        solver_name TEXT,
        solver_description TEXT
    )`)
    db.run(`CREATE TABLE IF NOT EXISTS Input_data (
        dataset_id TEXT PRIMARY KEY,
        dataset_name TEXT,
        dataset_description TEXT,
        input_data TEXT,
        num_vehicles INTEGER,
        depot INTEGER,
        max_distance INTEGER,
        upload_date DATE,
        time_res DATE,
        status TEXT,
        solver_id INTEGER,
        FOREIGN KEY(solver_id) REFERENCES Solver(solver_id)
    )`)
    db.run(`CREATE TABLE IF NOT EXISTS Solution (
        status TEXT,
        result TEXT,
        dataset_id INTEGER,
        FOREIGN KEY(dataset_id) REFERENCES Input_data(dataset_id)
    )`)
    
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Database connection closed.');
    }
});

