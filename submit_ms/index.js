require('dotenv').config()
const app = require('./app')
const multer = require('multer');
const {submit_problem} = require('./modules/submit_problem.js')
const {submit_metadata} = require('./modules/submit_metadata.js')
const {get_status} = require('./modules/get_status.js')

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({ storage: storage });

const PORT = process.env.PORT || 4005

app.post('/submit_problem',upload.single('file'),submit_problem) //to do
app.post('/submit_metadata',upload.single('file'),submit_metadata) //to do
app.get('/status',get_status) //to do

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    }
)