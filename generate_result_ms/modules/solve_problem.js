// const { spawn } = require('child_process');
// const { fetchJsonData } = require('../utils/retrieve_json.js'); // Import the function to fetch JSON data from the database
// const path = require('path');
// const fs = require('fs').promises;


// exports.solve_problem = async (req, res, next) => {
//     var solver_id = req.body.solver_id;
//     var metadata_id = req.body.metadata_id;
//     if(solver_id == 1){
//         var num_vehicles = req.body.num_vehicles;
//         var depot = req.body.depot;
//         var max_distance = req.body.max_distance;

//         // Fetch JSON data from the database based on metadata_id
//         try {
//             const jsonData = await fetchJsonData(metadata_id);

//             // Write JSON data to a temporary file
//             const tempFilePath = path.join(__dirname, 'temp.json');
//             await fs.writeFile(tempFilePath, jsonData);

//             // Execute Python script with the fetched JSON data
//             const pythonProcess = spawn('python', ['../solvers/vrpSolver.py', jsonData, num_vehicles, depot, max_distance]);

//             // Handle success or error
//             pythonProcess.on('close', (code) => {
//                 if (code === 0) {
//                     return res.status(200).json({ message: 'Problem solved successfully' });
//                 } else {
//                     return res.status(500).json({ message: 'Error solving problem', code: code});
//                 }
//             });
//         } catch (error) {
//             console.error('Error fetching JSON data from the database:', error);
//             return res.status(500).json({ message: 'Error fetching JSON data from the database' });
//         }
//     } else {
//         return res.status(400).json({ message: 'Solver ID not supported' });
//     }
// };
const { spawn } = require('child_process');
const { fetchJsonData } = require('../utils/retrieve_json.js'); // Import the function to fetch JSON data from the database
const path = require('path');
const fs = require('fs').promises;
const { join } = require('path');
//const { writeFile, readFile } = require('fs').promises;
const { writeFile } = require('fs/promises');
const executePythonScript = require('../utils/afuck.js');

exports.solve_problem = async (req, res, next) => {
    const solver_id = req.body.solver_id;
    const metadata_id = req.body.metadata_id;
    
    if(solver_id == 1){
        const num_vehicles = req.body.num_vehicles;
        const depot = req.body.depot;
        const max_distance = req.body.max_distance;

        try {
            // Fetch JSON data from the database based on metadata_id
            const jsonData = await fetchJsonData(metadata_id);

            // Write JSON data to a temporary file
            const tempFilePath = path.join(__dirname, 'temp.json');
            await fs.writeFile(tempFilePath, jsonData);

           executePythonScript(jsonData,4,5,6)
            


            // Wait for the child process to finish executing
            

            console.log('Execution completed');

            // Send response to the client

            
        } catch (error) {
            console.error('Error:', error);
        }
    } else {

    }
 };

