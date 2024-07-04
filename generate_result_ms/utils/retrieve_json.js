const sqlite3 = require('sqlite3').verbose();
const {executePythonScript} = require('./get_solver.js');

// Function to open SQLite database connection and fetch JSON data based on metadata_id
function fetch_and_solve(metadata_id) {
    // Open SQLite database connection
    const db = new sqlite3.Database('./data/mydatabase.db', (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        } else {
            // Query to fetch JSON data based on metadata_id
            const query = `SELECT * FROM Input_data WHERE dataset_id = ?`;

            // Execute the query with metadata_id parameter
            db.get(query, [metadata_id],(err, row) => {
                if (err) {
                    console.log("Error in fetching data from database")
                
                } else {
                    if (row) {
                        const jsonData = row.input_data;
                        const solver_id = row.solver_id;
                        const num_vehicles = row.num_vehicles;
                        const depot = row.depot;
                        const max_distance = row.max_distance;

                        executePythonScript(num_vehicles,depot,max_distance,solver_id,metadata_id,jsonData);
                    } else {
                        console.log("No data found in database")
                    }
                }
                
            });
        }
    });

    // Close the database connection after executing the query
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        }
    });
}

module.exports = { fetch_and_solve };
