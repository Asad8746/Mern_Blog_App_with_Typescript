import { Request, Response, NextFunction, RequestHandler } from "express";

export const asyncMiddleware = (routeHandler: RequestHandler): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await routeHandler(req, res, next);
        } catch (err: any) {
            next(err);
        }
    }
}