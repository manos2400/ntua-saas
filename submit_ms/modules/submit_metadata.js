const fs = require('fs');
const { send_submition,request_credits } = require('../kafka/producer.js');
const { validate_solver_json } = require('../utils/validate_first_solver.js');
const { generateSubmissionID} = require('../utils/unique_id_producer.js');


exports.submit_metadata = async (req, res, next) => {
    try {
        var solver_id = req.body.solver_id;
        var dataset_name = req.body.name;
        var dataset_description = req.body.description;
        var num_vehicles = req.body.num_vehicles;
        var depot = req.body.depot;
        var max_distance = req.body.max_distance;
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Validate format
        const validationError = validate_solver_json(req.file, solver_id);
        if (validationError) {
            // Remove uploaded file
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: validationError });
        }
        if (num_vehicles == null || depot == null || max_distance == null) {
            console.log(num_vehicles, depot, max_distance)
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const fileContent = fs.readFileSync(req.file.path);
        id = JSON.stringify(solver_id)
        // Send file contents to Kafka topic
        metadata_id = generateSubmissionID() + "metadata";
        await request_credits();
        await send_submition([
            fileContent,
            solver_id,dataset_name.toString(),
            dataset_description.toString(),
            metadata_id,
            num_vehicles, depot, max_distance
        ], "metadata");
        // Remove uploaded file
        fs.unlinkSync(req.file.path);
        res.status(200).json({ message: 'File submitted successfully' });
        
    } catch (error) {
        console.error('Error submitting metadata:', error);
        res.status(500).json({ error: 'Internal server error' });
        
    }
};
