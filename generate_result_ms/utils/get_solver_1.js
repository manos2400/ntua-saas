const { spawn } = require('child_process');
const {send_solution} = require('../kafka/producer.js');


function executePythonScript(numVehicles, depot, maxDistance,solver_id,metadata_id,data) {

        var datatosend;
        const pythonProcess = spawn('python', ['./solvers/vrpSolver.py', "temp", numVehicles, depot, maxDistance]);
        pythonProcess.stdin.write(JSON.stringify(data));
        pythonProcess.stdin.end();
        
        pythonProcess.stdout.on('data', (data) => {
            datatosend = data.toString();
            console.log(`Python script output: ${data}`);
            send_solution(data,solver_id,metadata_id,numVehicles,depot,maxDistance);
        });

        pythonProcess.stderr.on('data', (data) => {
            datatosend = data.toString();
            console.error(`Python script error: ${data}`);
            send_solution(data,solver_id,metadata_id);
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                console.log('Python process closed successfully');
            } else {
                console.log(code)
                console.error('Error solving problem');
            }
        });
}

module.exports = {executePythonScript};

