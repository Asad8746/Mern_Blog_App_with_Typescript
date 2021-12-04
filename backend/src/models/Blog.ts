import { Schema, model, Types, Document } from "mongoose";

export interface Blog extends Document<Types.ObjectId> {
    user_id: Types.ObjectId,
    title: string;
    description: string;
    createdAt: Date,
    updatedAt: Date

}

const blog_schema = new Schema<Blog>({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
}, { timestamps: true })


export const BlogModel = model<Blog>("Blog", blog_schema)
