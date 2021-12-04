import { Response } from "express"
import bcrypt from "bcrypt";
import { controller, post, Request } from "./decorators";
import { UserModel, User } from "../models";
import { loginValidator, LoginBody, registerValidator, RegisterBody } from "../validators";

@controller("/auth")
class AuthController {
    @post("/login")
    async loginUser(req: Request<LoginBody>, res: Response) {
        const { error } = loginValidator(req.body);
        if (error) {
            res.status(422)
            throw new Error(error.details[0].message)
        }
        const { email, password } = req.body;
        const user: User | null = await UserModel.findOne({ email })
        if (!user) {
            res.status(400);
            throw new Error("wrong email or password");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.status(400);
            throw new Error("wrong email or password");
        }
        const token = user.genToken();
        res
            .header("Authorization", token)
            .status(200)
            .send({
                id: user._id,
                fname: user.fname,
                email: user.email
            });

    }
    @post("/register")
    async registerUser(req: Request<RegisterBody>, res: Response) {
        const { error } = registerValidator(req.body);
        if (error) {

            res.status(422).send({ message: error.details[0].message });
        }
        const { fname, email } = req.body;
        const checkUser: User | null = await UserModel.findOne({ email })

        if (checkUser) {
            res.status(400)
            throw new Error(`Please choose another Email rather than ${email}`)
        }
        const password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
        const user: User = new UserModel({
            fname,
            email,
            password
        })
        const token = user.genToken();
        await user.save();
        res.header("Authorization", token).status(201).send({ id: user._id, fname: user.fname, email: user.email })

    }
}