import mongoose, { Document, Model } from "mongoose";
import jwt from "jsonwebtoken"
export interface User extends Document {
    fname: string,
    email: string,
    password: string,
    genToken(): string
}


const user_schema = new mongoose.Schema<User>({
    fname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    }
})



user_schema.methods.genToken = function (): string {
    const token = jwt.sign({ id: this._id }, "secretKey")
    return token
}

export const UserModel = mongoose.model<User>("User", user_schema);