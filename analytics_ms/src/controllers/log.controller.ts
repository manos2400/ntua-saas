import { Request, Response } from "express";
import { Problem } from "../entities/problem.entity";
import { database } from "../utils/database";
import { timeDiff, timeFormat } from "../utils/analysis";

export const getLog = async (req: Request, res: Response) => {
    
    // return list of problems (without dataset and metadata)
    const problems = await database.getRepository(Problem).find();

    // create new object to return that will contain property executionTime
    const prob2 = problems.map(problem => {
        //const execTime = timeDiff(problem.timestampStart, problem.timestampEnd);
        //const execTimeHR = timeFormat(execTime); // Human Readable
        return {
            id: problem.id,
            //description: problem.description,
            //solver: problem.solver,
            submitted: problem.timestampStart,
            finished: problem.timestampEnd
            //execTime,
            //execTimeHR
        }
    });

    res.json(prob2);

}