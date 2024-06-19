const fs = require('fs');
const { send_submission,request_credits } = require('../kafka/producer.js');
const { validate_solver_json } = require('../utils/validate_first_solver.js');
const { generateSubmissionID } = require('../utils/unique_id_producer.js');


exports.submit_metadata = async (req, res) => {
    try {
        const solver_id = req.body.solver_id;
        const dataset_name = req.body.name;
        const dataset_description = req.body.description;
        const num_vehicles = req.body.num_vehicles;
        const depot = req.body.depot;
        const max_distance = req.body.max_distance;
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Validate format
        const validationError = validate_solver_json(req.file, parseInt(solver_id));
        if (validationError) {
            // Remove uploaded file
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: validationError });
        }
        if (!num_vehicles || !depot || !max_distance) {
            console.log(num_vehicles, depot, max_distance)
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const fileContent = fs.readFileSync(req.file.path);
        // Send file contents to Kafka topic
        const metadata_id = generateSubmissionID();
        await request_credits();
        await send_submission([
            fileContent,
            solver_id,
            dataset_name.toString(),
            dataset_description.toString(),
            metadata_id,
            num_vehicles, depot, max_distance
        ]);
        if(fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        // Return success message with metadata ID
        res.status(200).json({ message: 'Problem submitted successfully', problem_id: metadata_id });

    } catch (error) {
        console.error('Error submitting metadata:', error);
        res.status(500).json({ error: 'Internal server error' });
        
    }
};
