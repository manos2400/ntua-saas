import { Request, Response } from "express";
import { Problem } from "../entities/problem.entity";
import { database } from "../utils/database";
import { timeDiff, timeFormat } from "../utils/analysis";


export const getProblemStats = async (req: Request, res: Response) => {

    
    const problemId : string = req.params.id;

    // check if id is a number (old impl where id was number)
    /*if (isNaN(problemId)) {
        res.status(400).json({ message: 'Problem id must be a number!' });
        return;
    }*/

    const problem = await database.getRepository(Problem).findOne({ where: { id: problemId } });
    
    if (!problem) {
        res.status(404).json({ message: `Problem ${problemId} not found!` });
        return;
    }

    res.json(problem);
}