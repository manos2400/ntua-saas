import {Request, Response} from "express";

export const getStatus = async (req: Request, res: Response) => {

    res.status(200).json({ message: 'Analytics microservice is running!' });

}