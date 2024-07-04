const { spawn } = require('child_process');
const {send_solution} = require('../kafka/producer.js');


function executePythonScript(numVehicles, depot, maxDistance,solver_id,metadata_id,data) {

        const pythonProcess = spawn('python', ['./solvers/vrpSolver.py', numVehicles, depot, maxDistance]);
        pythonProcess.stdin.write(JSON.stringify(data));
        pythonProcess.stdin.end();
        
        pythonProcess.stdout.on('data', (data) => {
            send_solution(data,solver_id,metadata_id);
        });

        pythonProcess.stderr.on('data', (data) => {
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

