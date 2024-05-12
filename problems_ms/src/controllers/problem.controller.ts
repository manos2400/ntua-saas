import {Request, Response} from "express";
import { Problem } from "../entities/problem.entity";
import { database } from "../utils/database";
import {kafka} from "../service";
import {Result} from "../entities/result.entity";
import {Dataset} from "../entities/dataset.entity";
import {Metadata} from "../entities/metadata.entity";

export const getAllProblems = async (req: Request, res: Response) => {
    // get all problems
    const problems = await database.getRepository(Problem).find({relations: ['datasets', 'metadata']});
    res.json(problems);
}

export const getProblem = async (req: Request, res: Response) => {
    // get problem by id
    const problemId : number = parseInt(req.params.id);
    const problem = await database.getRepository(Problem).findOne({
        where: { id: problemId },
        relations: ['datasets', 'metadata']
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
        relations: ['datasets', 'metadata']
    });
    if (!problem) {
        res.status(404).json({ message: 'Problem not found!' });
        return;
    }
    await database.getRepository(Dataset).delete({ problem: { id: problemId } });
    await database.getRepository(Metadata).delete({ problem: { id: problemId } });
    await database.getRepository(Problem).delete({ id: problemId });

    // Notify other microservices that the problem was deleted
    await kafka.produce('problem-delete', [{ value: JSON.stringify({ id: problemId }) }]);
    res.json({ message: 'Problem deleted!' });
}