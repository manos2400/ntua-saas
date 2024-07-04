const sqlite3 = require('sqlite3').verbose();

// Create SQLite database connection

// Function to handle Kafka messages and insert data into SQLite database
exports.add_metadata = (message) => {

    const db = new sqlite3.Database('./data/mydatabase.db');
    // Extract data from Kafka message

    const datasetName = message.dataset_name || null;
    const datasetDescription = message.dataset_description || null;
    let inputData = message.data || null;
    const uploadDate = new Date().toISOString() || null;
    const timeRes = message.time_res || null;
    const status = message.status || null;
    const solverId = message.solver_id || null;
    const dataset_id = message.id || null;


    const parameters = message.parameters || [];
    const numVehiclesParam = parameters.find(param => param.hasOwnProperty('num_vehicles'));
    const depotParam = parameters.find(param => param.hasOwnProperty('depot'));
    const maxDistanceParam = parameters.find(param => param.hasOwnProperty('max_distance'));

    const numVehicles = numVehiclesParam ? parseInt(numVehiclesParam.num_vehicles, 10) : null;
    const depot = depotParam ? parseInt(depotParam.depot, 10) : null;
    const maxDistance = maxDistanceParam ? parseInt(maxDistanceParam.max_distance, 10) : null;

    console.log(inputData)

    inputData = JSON.stringify(inputData)

    // Insert data into Input_data table
    db.serialize(() => {
        db.run(`INSERT INTO Input_data (dataset_id,dataset_name, dataset_description, input_data, upload_date, time_res, status, solver_id, num_vehicles, depot, max_distance) 
                VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [dataset_id,datasetName, datasetDescription, inputData, uploadDate, timeRes, status, solverId, numVehicles, depot, maxDistance], 
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