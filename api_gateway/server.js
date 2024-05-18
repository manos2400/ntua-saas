const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const creditRoutes = require('./controllers/credits');
const submitProblemRoutes = require('./controllers/submitProblem');
const analyticsRoutes = require('./controllers/analytics');
const resultRoutes = require('./controllers/results');
const problemRoutes = require('./controllers/problems');

app.use('/solver_api/credits', creditRoutes);
// app.use('/solver_api/submitProblem', submitProblemRoutes);
// app.use('/solver_api/analytics', analyticsRoutes);
// app.use('/solver_api/results', resultRoutes);
app.use('/solver_api/problemlist', problemRoutes);

app.use((req, res, next) => {res.status(404).json({message: 'Endpoint not found'})});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});