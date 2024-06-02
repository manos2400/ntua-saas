#!/bin/sh

# Activate the virtual environment
. /app/venv/bin/activate

npm run database_init
# Start the Node.js application
npm start