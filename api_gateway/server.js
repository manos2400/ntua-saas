const express = require('express');
const cors = require('cors');

const app = express();


const corsOptions = {
    origin: '*', // Allow all -- TODO: update this later
    //origin: ['http://localhost:3001', 'http://localhost:3002'], // for example
    methods: ['GET','PUT', 'POST', 'DELETE']
};

app.use(cors(corsOptions));

app.use(express.urlencoded({extended: true, limit: '100mb'}));
app.use(express.json());


const creditRoutes = require('./controllers/credits');
const submitProblemRoutes = require('./controllers/submitProblem');
// const analyticsRoutes = require('./controllers/analytics');
// const resultRoutes = require('./controllers/results');
const problemRoutes = require('./controllers/problems');

app.use('/solver_api/credits', creditRoutes);
app.use('/solver_api/submitProblem', submitProblemRoutes);
// app.use('/solver_api/analytics', analyticsRoutes);
// app.use('/solver_api/results', resultRoutes);
app.use('/solver_api/problemlist', problemRoutes);

app.use((req, res, next) => {res.status(404).json({message: 'Endpoint not found'})});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});