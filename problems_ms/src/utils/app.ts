import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as problemController from '../controllers/problem.controller';
import { getStatus} from "../controllers/status.controller";

const app = express();

app.use(bodyParser.json());

const corsOptions = {
    origin: '*', // TODO: update this later
    methods: 'GET, DELETE',
};

app.use(cors(corsOptions));

app.get('/status', getStatus);
app.get('/problems', problemController.getAllProblems);
app.get('/problems/:id', problemController.getProblem);

app.delete('/problems/:id', problemController.deleteProblem);

export default app;
