require('dotenv').config()
const app = require('./app')
const multer = require('multer');
const {submit_metadata} = require('./modules/submit_metadata.js')
const {get_status} = require('./modules/get_status.js')

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        const  timestamp = new Date().getTime();
        const original_name = file.originalname.split('.').slice(0, -1).join('.');
        const name = original_name + '_' + timestamp + '.' + file.originalname.split('.').pop();
        cb(null, name);
    }
});

const upload = multer({ storage: storage });

const PORT = process.env.PORT || 4005

app.post('/submit_metadata',upload.single('file'),submit_metadata);
app.get('/status',get_status);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    }
)