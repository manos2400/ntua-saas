import {Request, Response} from "express";
import { Problem } from "../entities/problem.entity";
import { database } from "../utils/database";
import {kafka} from "../service";
import {Dataset} from "../entities/dataset.entity";
import {Metadata} from "../entities/metadata.entity";

export const getAllProblems = async (req: Request, res: Response) => {
    // get all problems
    const problems = await database.getRepository(Problem).find({relations: ['datasets', 'metadata']});
    if(problems.length === 0) {
        res.status(200).json({ message: 'No problems found!' });
        return;
    }
    res.json(problems);
}

export const getProblem = async (req: Request, res: Response) => {
    // get problem by id
    const problemId : string = req.params.id;
    const problem = await database.getRepository(Problem).findOne({
        where: { id: problemId },
        relations: ['datasets', 'metadata']
    });
    if (!problem) {
        res.status(400).json({ message: 'Problem not found!' });
        return;
    }
    res.json(problem);
}

export const deleteProblem = async (req: Request, res: Response) => {
    // delete problem by id and its result if exists
    const problemId : string = req.params.id;
    const problem = await database.getRepository(Problem).findOne({
        where: {id: problemId},
        relations: ['datasets', 'metadata']
    });
    if (!problem) {
        res.status(400).json({ message: 'Problem not found!' });
        return;
    }
    await database.getRepository(Dataset).delete({ problem: { id: problemId } });
    await database.getRepository(Metadata).delete({ problem: { id: problemId } });
    await database.getRepository(Problem).delete({ id: problemId });

    // Notify other microservices that the problem was deleted
    await kafka.produce('problem-deleted', [{ value: JSON.stringify({ id: problemId }) }]);
    res.json({ message: 'Problem deleted!' });
}