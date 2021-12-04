import mongoose from "mongoose";
import { Request, Response, RequestHandler, NextFunction } from "express";

export interface CustomParams {
    id: string
}
export const validObjectId: RequestHandler<CustomParams> = (req: Request<CustomParams>, res: Response, next: NextFunction): void => {
    const isValidID = mongoose.isValidObjectId(req.params.id);
    if (!isValidID) {
        res.status(400).send({ message: "Invalid object id" });
        return;
    }
    next();
}