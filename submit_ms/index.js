require('dotenv').config()
const app = require('./app')
const {submit_problem} = require('./modules/submit_problem.js')
const {submit_metadata} = require('./modules/submit_metadata.js')
const {get_status} = require('./modules/get_status.js')

const PORT = process.env.PORT || 3000

app.post('/submit_problem',submit_problem) //to do
app.post('/submit_metadata',submit_metadata) //to do
app.get('/status',get_status) //to do

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    }
)