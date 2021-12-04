import Joi, { ValidationResult } from "joi"


export interface LoginBody {
    email: string;
    password: string
}

export interface RegisterBody {
    fname: string;
    email: string;
    password: string
}
export const loginValidator = (body: LoginBody): ValidationResult => {
    const schema = Joi.object<LoginBody>({
        email: Joi.string().required().email().min(3).max(255),
        password: Joi.string().required().min(3).max(1024),
    })
    return schema.validate(body);
}

export const registerValidator = (body: RegisterBody): ValidationResult => {
    const schema = Joi.object<RegisterBody>({
        fname: Joi.string().required().min(3).max(255),
        email: Joi.string().required().email().min(3).max(255),
        password: Joi.string().required().min(3).max(255),
    })
    return schema.validate(body);
}