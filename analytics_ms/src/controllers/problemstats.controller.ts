import { Request, Response } from "express";
import { Problem } from "../entities/problem.entity";
import { database } from "../utils/database";

export const getProblemStats = async (req: Request, res: Response) => {

    
    const problemId : string = req.params.id;

    const problem = await database.getRepository(Problem).findOne({ where: { id: problemId } });
    
    if (!problem) {
        res.status(404).json({ message: `Problem ${problemId} not found!` });
        return;
    }

    res.json(problem);
}