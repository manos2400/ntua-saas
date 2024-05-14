import { Request, Response } from "express";
import { Problem } from "../entities/problem.entity";
import { database } from "../utils/database";
import { timeDiff, timeFormat } from "../utils/analysis";


export const getProblemStats = async (req: Request, res: Response) => {

    
    const problemId : number = parseInt(req.params.id);

    // check if id is a number
    if (isNaN(problemId)) {
        res.status(400).json({ message: 'Problem id must be a number!' });
        return;
    }

    const problem = await database.getRepository(Problem).findOne({
        where: { id: problemId }
    });
    
    if (!problem) {
        res.status(404).json({ message: 'Problem not found!' });
        return;
    }
    
    const execTime = timeDiff(problem.timestampStart, problem.timestampEnd);
    const execTimeHR = timeFormat(execTime); // Human Readable
    const prob2 = {
        id: problem.id,
        description: problem.description,
        solver: problem.solver,
        submitted: problem.timestampStart,
        finished: problem.timestampEnd,
        execTime,
        execTimeHR
    }

    res.json(prob2);
}