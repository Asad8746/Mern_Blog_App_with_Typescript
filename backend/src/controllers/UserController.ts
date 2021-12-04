import { Response } from "express"
import bcrypt from "bcrypt";
import { controller, get, use, } from "./decorators";
import { UserModel, User } from "../models";
import { auth, AuthMiddleware, CustomAuthRequest } from "../middlewares";

@controller("/me")
class AuthController {
    @get("/")
    @use<AuthMiddleware>(auth)
    async loginUser(req: CustomAuthRequest, res: Response) {
        const user_id = req.user;
        const user: User | null = await UserModel.findById(user_id).select("_id fname email ");
        if (!user) {
            res.status(404);
            throw new Error("Oops User not found")
        }
        res.status(200).send(user);
    }
}