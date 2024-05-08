

//TO DO 
// const fs = require('fs');
// const { send_submition } = require('../kafka/producer.js');

exports.submit_problem = async (req, res, next) => {
    try {
            // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Check if file is a .py file
        const allowedExtensions = ['py'];
        console.log(req.file.originalname);
        const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            // Remove uploaded file
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: 'Uploaded file must be a .py file' });
        }

        // Read file contents as binary data
        const fileContent = fs.readFileSync(req.file.path);

        await send_submition(fileContent,"sourcefile");

        // Remove uploaded file
        fs.unlinkSync(req.file.path);

        res.status(200).json({ message: 'File submitted successfully' });
    } catch (error) {
        console.error('Error submitting problem:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
