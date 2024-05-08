const kafka = require('kafka-node');
const sqlite3 = require('sqlite3').verbose();

// Create SQLite database connection

// Function to handle Kafka messages and insert data into SQLite database
exports.add_metadata = (message) => {

    const db = new sqlite3.Database('./data/mydatabase.db');
    // Extract data from Kafka message

    const datasetName = message.dataset_name || null;
    const datasetDescription = message.dataset_description || null;
    var inputData = message.data || null;
    const uploadDate = new Date().toISOString() || null;
    const timeRes = message.time_res || null;
    const status = message.status || null;
    const solverId = message.solver_id || null;

    console.log(inputData)

    inputData = JSON.stringify(inputData)

    // Insert data into Input_data table
    db.serialize(() => {
        db.run(`INSERT INTO Input_data (dataset_name, dataset_description, input_data, upload_date, time_res, status, solver_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`, 
                [datasetName, datasetDescription, inputData, uploadDate, timeRes, status, solverId], 
                function(err) {
                    if (err) {
                        console.error('Error inserting data into Input_data table:', err.message);
                    } else {
                        console.log('Inserted data into Input_data table.');
                    }
                });

    });
    db.close();
}
