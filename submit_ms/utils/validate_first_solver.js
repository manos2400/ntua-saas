
const fs = require('fs');

exports.validate_solver_json = (content,solver_id) => {
    if (solver_id === 1) {
        if (content.mimetype !== 'application/json') {
            // Remove uploaded file
            fs.unlinkSync(content.path);
            return 'Uploaded file must be a JSON file';
        }

        // Read file contents as string
        const fileContent = fs.readFileSync(content.path);

        // Try parsing the file content as JSON
        let jsonData;
        try {
            jsonData = JSON.parse(fileContent);
        } catch (error) {
            // Remove uploaded file
            fs.unlinkSync(req.file.path);
            return 'Uploaded file is not valid JSON';
        }

        if (!jsonData.Locations || !Array.isArray(jsonData.Locations)) {
            return 'JSON file does not have "Locations" key or it is not an array';
        }

        const invalidLocation = jsonData.Locations.find(location => !location.Latitude || !location.Longitude);
        if (invalidLocation) {
            return 'Each location object in the JSON file must have "Latitude" and "Longitude" keys';
        }

        return null; // No validation errors
    }else{
        return 'This solver is not supported yet';
    }
}