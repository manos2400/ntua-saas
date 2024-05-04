const fs = require('fs');

const databasePath = '../data/mydatabase.db';

// Check if the file exists
if (fs.existsSync(databasePath)) {
    // Remove the file
    fs.unlinkSync(databasePath);
    console.log('Database dropped successfully.');
} else {
    console.log('Database file not found.');
}