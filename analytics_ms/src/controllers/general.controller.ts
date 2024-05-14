import { Request, Response } from "express";
import { Problem } from "../entities/problem.entity";
import { database } from "../utils/database";
import { timeDiff, timeFormat } from "../utils/analysis";
import {kafka} from "../service";
import { finished } from "stream";


// TODO: problems solved by month

// TODO: average solving time per month

// TODO: stats per solver

export const getGeneral = async (req: Request, res: Response) => {
    
    // get general statistics for all problems
    // but instead of timeStart and timeEnd, we want to calculate the execution time
    // so we need to call timeDiff for each problem
    const problems = await database.getRepository(Problem).find();

    if (!problems) {
        res.status(404).json({ message: 'No problems found!' });
        return;
    }

    const general = {
        nProblemsTotal: problems.length,
        nProblemsFinished: 0,
        avgExecTime: 0,
        avgExecTimeHR: "0",
        minExecTime: Number.MAX_SAFE_INTEGER,
        minExecTimeHR: timeFormat(Number.MAX_SAFE_INTEGER),
        maxExecTime: Number.MIN_SAFE_INTEGER,
        maxExecTimeHR: timeFormat(Number.MIN_SAFE_INTEGER)
    };
    const solversStats = {
        name: "",
        nProblemsSolved: 0,
        avgExecTime: 0,
        avgExecTimeHR: "0",
        minExecTime: Number.MAX_SAFE_INTEGER,
        minExecTimeHR: timeFormat(Number.MAX_SAFE_INTEGER),
        maxExecTime: Number.MIN_SAFE_INTEGER,
        maxExecTimeHR: timeFormat(Number.MIN_SAFE_INTEGER)


    };
    problems.forEach(problem => {
        const executionTime = timeDiff(problem.timestampStart, problem.timestampEnd);
        if(executionTime === -1) return; // problem not finished yet
        general.nProblemsFinished++;
        general.avgExecTime += executionTime;
        if (executionTime < general.minExecTime) {
            general.minExecTime = executionTime;
        }
        if (executionTime > general.maxExecTime) {
            general.maxExecTime = executionTime;
        }
    });
    general.avgExecTime /= general.nProblemsFinished;
    general.avgExecTimeHR = timeFormat(general.avgExecTime);
    general.minExecTimeHR = timeFormat(general.minExecTime);
    general.maxExecTimeHR = timeFormat(general.maxExecTime);

    res.json(general);

}
