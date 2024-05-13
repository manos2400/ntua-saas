import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Cross-Origin Resource Sharing
import { getStatus, getDebug } from "../controllers/status.controller";
import { getGeneral } from "../controllers/general.controller";
import { getLog } from "../controllers/log.controller";
import { getProblemStats } from "../controllers/problemstats.controller";

const app = express();

app.use(bodyParser.json());

const corsOptions = {
    origin: '*', // Allow all -- TODO: update this later
    //origin: ['http://localhost:3001', 'http://localhost:3002'], // for example
    methods: 'GET',
};

app.use(cors(corsOptions));

app.get('/status', getStatus); // get server status
app.get('/analytics', getGeneral); // get general statistics
app.get('/log', getLog); // get log (list of submissions)
app.get('/analytics/:id', getProblemStats); // get statistics for a specific problem
app.get('/debug', getDebug); // temporary for debugging

export default app;
