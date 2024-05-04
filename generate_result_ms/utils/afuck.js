const { spawn } = require('child_process');

function executePythonScript(filePath, numVehicles, depot, maxDistance) {
    const pythonProcess = spawn('python', ['../solvers/vrpSolver.py', filePath, numVehicles, depot, maxDistance]);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python script output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python script error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            console.log('Python process closed successfully');
        } else {
            console.error('Error solving problem');
        }
    });
}

executePythonScript("../modules/temp.json", 5, 5, 5);
