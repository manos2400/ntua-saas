// Import necessary modules
const { v4: uuidv4 } = require('uuid');

// Function to generate a unique submission ID
exports.generateSubmissionID= () =>{
    // Generate a UUID (Universally Unique Identifier)
    return uuidv4();
}


