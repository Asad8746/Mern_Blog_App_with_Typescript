import { Schema, model, ObjectId, Types } from "mongoose";

export interface Blog {
    user_id: ObjectId,
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


model<Blog>("Blog", blog_schema)