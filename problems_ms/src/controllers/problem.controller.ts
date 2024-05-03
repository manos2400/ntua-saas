import {Request, Response} from "express";
import { Problem } from "../entities/problem.entity";
import { database } from "../utils/database";
import {kafka} from "../service";
import {Result} from "../entities/result.entity";

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

export const deleteProblem = async (req: Request, res: Response) => {
    // delete problem by id and its result if exists
    const problemId : number = parseInt(req.params.id);
    const problem = await database.getRepository(Problem).findOne({
        where: {id: problemId},
        relations: ['result']
    });
    if (!problem) {
        res.status(404).json({ message: 'Problem not found!' });
        return;
    }
    await database.getRepository(Problem).delete({ id: problemId });
    if (problem.result) {
        await database.getRepository(Result).delete({ id: problem.result.id });
    }
    // Notify other microservices that the problem was deleted
    await kafka.produce('problem-delete', [{ value: JSON.stringify({ id: problemId }) }]);
    res.json({ message: 'Problem deleted!' });
}