const sqlite3 = require('sqlite3').verbose();
const {executePythonScript} = require('./get_solver_1.js');

// Function to open SQLite database connection and fetch JSON data based on metadata_id
function fetch_and_solve(metadata_id) {
    // Open SQLite database connection
    const db = new sqlite3.Database('./data/mydatabase.db', (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        } else {
            // Query to fetch JSON data based on metadata_id
            const query = `SELECT input_data FROM Input_data WHERE dataset_id = ?`;

            // Execute the query with metadata_id parameter
            db.get(query, [metadata_id],(err, row) => {
                if (err) {
                    console.log("Error in fetching data from database")
                
                } else {
                    if (row) {
                        executePythonScript(4,5,6,1,1,row.input_data);
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
