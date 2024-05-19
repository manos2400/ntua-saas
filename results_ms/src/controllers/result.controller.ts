import {Request, Response} from "express";
import { database } from "../utils/database";
import {Result} from "../entities/result.entity";

export const getResult = async (req: Request, res: Response) => {
    // get result by id
    const problemId : string = req.params.id;
    const result = await database.getRepository(Result).findOne({
        where: { problem_id: problemId }
    });
    if (!result) {
        res.status(404).json({ message: 'Result not found for this problem!' });
        return;
    }
    // parse json output
    result.output = JSON.parse(result.output);
    res.json(result);
}