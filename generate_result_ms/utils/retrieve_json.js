const sqlite3 = require('sqlite3').verbose();

// Function to open SQLite database connection and fetch JSON data based on metadata_id
async function fetchJsonData(metadata_id) {
    return new Promise((resolve, reject) => {
        // Open SQLite database connection
        const db = new sqlite3.Database('./data/mydatabase.db', (err) => {
            if (err) {
                reject(err);
            } else {
                // Query to fetch JSON data based on metadata_id
                const query = `SELECT input_data FROM Input_data WHERE dataset_id = ?`;

                // Execute the query with metadata_id parameter
                db.get(query, [metadata_id], (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (row) {
                            resolve(row.input_data);
                        } else {
                            reject(new Error('No data found for the given metadata_id'));
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
    });
}

module.exports = { fetchJsonData };
