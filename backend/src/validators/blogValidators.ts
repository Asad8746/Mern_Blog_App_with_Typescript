import Joi, { ValidationResult } from "joi";


export interface BlogBody {
    title: string,
    description: string
}

export const blogValidator = (body: BlogBody): ValidationResult => {
    const schema = Joi.object<BlogBody>({
        title: Joi.string().required(),
        description: Joi.string().required(),
    })
    return schema.validate(body);
}