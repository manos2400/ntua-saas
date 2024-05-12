import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as resultController from '../controllers/result.controller';
import { getStatus} from "../controllers/status.controller";

const app = express();

app.use(bodyParser.json());

const corsOptions = {
    origin: '*', // TODO: update this later
    methods: 'GET, DELETE',
};

app.use(cors(corsOptions));

app.get('/status', getStatus);
app.get('/results/:id', resultController.getResult);

export default app;
