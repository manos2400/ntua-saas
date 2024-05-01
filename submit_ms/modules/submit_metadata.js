const fs = require('fs');
const { send_submition } = require('../kafka/producer.js');

exports.submit_metadata = async (req, res, next) => {
    try {
        var id = req.body.id;
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Check if file is a JSON file
        if (req.file.mimetype !== 'application/json') {
            // Remove uploaded file
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: 'Uploaded file must be a JSON file' });
        }

        // Read file contents as string
        const fileContent = fs.readFileSync(req.file.path);

        // Try parsing the file content as JSON
        let jsonData;
        try {
            jsonData = JSON.parse(fileContent);
        } catch (error) {
            // Remove uploaded file
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: 'Uploaded file is not valid JSON' });
        }
        id = JSON.stringify(id)
        // Send file contents to Kafka topic
        await send_submition([fileContent, id], "metadata");

        // Remove uploaded file
        fs.unlinkSync(req.file.path);

        res.status(200).json({ message: 'File submitted successfully' });
    } catch (error) {
        console.error('Error submitting metadata:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
