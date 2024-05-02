import {Request, Response} from "express";
import { Problem } from "../entities/problem.entity";
import { database } from "../utils/database";

export const getAllProblems = async (req: Request, res: Response) => {
    // get all problems
    const problems = await database.getRepository(Problem).find({relations: ['result']});
    res.json(problems);
}

export const getProblem = async (req: Request, res: Response) => {
    // get problem by id
    const problemId : number = parseInt(req.params.id);
    const problem = await database.getRepository(Problem).findOne({
        where: { id: problemId },
        relations: ['result']
    });
    if (!problem) {
        res.status(404).json({ message: 'Problem not found!' });
        return;
    }
    res.json(problem);
}
