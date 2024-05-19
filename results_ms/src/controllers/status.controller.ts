import {Request, Response} from "express";


export const getStatus = async (req: Request, res: Response) => {
    // get status
    res.status(200).json({ message: 'Server is running!' });
}