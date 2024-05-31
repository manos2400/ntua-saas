import { Request, Response } from "express";
import { Problem } from "../entities/problem.entity";
import { database } from "../utils/database";

export const getLog = async (req: Request, res: Response) => {
    
    // return list of problems (without dataset and metadata)
    const problems = await database.getRepository(Problem).find();

    // create new object to return that will only contain basic identification info
    const prob2 = problems.map(problem => {
        return {
            id: problem.id,
            submittedAt: problem.submittedAt,
            solvedAt: problem.solvedAt
        }
    });

    res.json(prob2);

}