import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export const errorMiddleware: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    const errMessage: string = res.statusCode === 500 ? "Oops internal Error" : err.message
    res.status(statusCode).send({ message: errMessage });
}