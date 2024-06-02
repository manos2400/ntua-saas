require('dotenv').config()
const app = require('./app')
const sqlite3 = require('sqlite3').verbose();
const kafkaConsumer = require('./kafka/consumer');
const {get_status} = require('./modules/get_status.js')
const {solve_problem} = require('./modules/solve_problem.js')

// const db = new sqlite3.Database('./data/mydatabase.db');
// const db = require('/app/generate_result_ms/utils/database.js');

kafkaConsumer.init();

const PORT = process.env.PORT || 4005

app.post('/solveproblem', solve_problem)
app.get('/status',get_status);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    }
)