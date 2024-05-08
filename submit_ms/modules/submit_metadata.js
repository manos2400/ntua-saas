const fs = require('fs');
const { send_submition } = require('../kafka/producer.js');
const { validate_solver_json } = require('../utils/validate_first_solver.js');
const { generateSubmissionID} = require('../utils/unique_id_producer.js');

exports.submit_metadata = async (req, res, next) => {
    try {
        var solver_id = req.body.solver_id;
        var dataset_name = req.body.name;
        var dataset_description = req.body.description;
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

        const fileContent = fs.readFileSync(req.file.path);
        id = JSON.stringify(solver_id)
        // Send file contents to Kafka topic
        metadata_id = generateSubmissionID() + "metadata";
        await send_submition([fileContent, solver_id,dataset_name.toString(),dataset_description.toString(),metadata_id], "metadata");

        // Remove uploaded file
        fs.unlinkSync(req.file.path);

        res.status(200).json({ message: 'File submitted successfully' });
    } catch (error) {
        console.error('Error submitting metadata:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
