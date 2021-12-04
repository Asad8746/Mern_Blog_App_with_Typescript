import { Response, NextFunction } from "express";
import { Request } from "../controllers/decorators";
import jwt from "jsonwebtoken"

export interface CustomAuthRequest<T = any, P = any> extends Request<T, P> {
    user: string
}
export type AuthMiddleware<T = any> = (req: CustomAuthRequest<T>, res: Response, next: NextFunction) => void;
export const auth = (req: CustomAuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"] || "";
        const decoded = jwt.verify(token, "secretKey");
        if (typeof decoded !== "string") {
            req.user = decoded["id"]
            next()
        }

    } catch (err: any) {
        console.log(err.message);
        res.status(401).send({ message: "Invalid token" })
    }
}