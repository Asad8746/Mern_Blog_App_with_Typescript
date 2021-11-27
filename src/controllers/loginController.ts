import { Response } from "express"
import bcrypt from "bcrypt";
import { controller, post, Request } from "./decorators";
import { UserModel, User } from "../models";
import { loginValidator, LoginBody, registerValidator, RegisterBody } from "../validators";

@controller("/auth")
class AuthController {
    @post("/login")
    async loginUser(req: Request<LoginBody>, res: Response) {
        try {
            const { error } = loginValidator(req.body);
            if (error) {
                res.status(422).send({ message: error.details[0].message });
                return;
            }
            const { email, password } = req.body;
            const user: User | null = await UserModel.findOne({ email })
            if (!user) {
                res.status(404).send({ message: "Wrong email or password" })
                return;
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                res.status(404).send({ message: "Wrong email or password" })
                return
            }
            const token = user.genToken();
            console.log("token", token)
            res
                .header("Authorization", token)
                .status(200)
                .send({
                    id: user._id,
                    fname: user.fname,
                    email: user.email
                });
        } catch (err: any) {
            res.status(400).send(err.message);
        }
    }
    @post("/register")
    async registerUser(req: Request<RegisterBody>, res: Response) {
        try {
            const { error } = registerValidator(req.body);
            if (error) {
                res.status(422).send({ message: error.details[0].message });
            }
            const password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
            const user: User = new UserModel({
                fname: req.body.fname,
                email: req.body.email,
                password
            })
            const token = user.genToken();
            await user.save();
            res.header("Authorization", token).status(201).send({ id: user._id, fname: user.fname, email: user.email })
        } catch (err: any) {
            res.status(400).send(err.message);
        }
    }
}