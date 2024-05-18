const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();


exports.insertSolverIntoDatabase =  (solverName, solverDescription, pythonFilePath) => {
    // Connect to the SQLite database
    const db = new sqlite3.Database('../data/mydatabase.db');

    // Read the Python file as blob data
    const blobData = fs.readFileSync( pythonFilePath);

    // Insert the Solver object into the table
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS Solver (solver_id INTEGER PRIMARY KEY, solver_name TEXT NOT NULL, solver_description TEXT)');
        const stmt = db.prepare('INSERT INTO Solver (solver_name, solver_description) VALUES (?, ?)');
        stmt.run(solverName, solverDescription, blobData, (err) => {
            if (err) {
                console.error('Error inserting Solver:', err.message);
            } else {
                console.log('Solver inserted successfully.');
            }
        });
        stmt.finalize();
    });

    // Close the database connection
    db.close();
}

//insertSolverIntoDatabase('Solver 1', 'Solver 1 description', './solvers/vrpSolver.py');


