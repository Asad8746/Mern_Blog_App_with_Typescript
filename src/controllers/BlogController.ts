
import { Response } from "express";
import mongoose from "mongoose";
import { controller, get, use, post } from "./decorators"
import { Blog, BlogModel } from "../models";
import { validObjectId, CustomParams, auth, CustomAuthRequest, AuthMiddleware } from "../middlewares";
import { BlogBody, blogValidator } from "../validators";

@controller("/blogs")
class BlogController {
    @get("/")
    @use<AuthMiddleware>(auth)
    async getBlogs(req: CustomAuthRequest, res: Response) {
        const { user: user_id } = req;
        // const user_id = new mongoose.Types.ObjectId(user);
        const blogs: Blog[] = await BlogModel.find({ user_id })
        res.status(200).send(blogs);
    }
    @get("/:id")
    @use(validObjectId)
    @use<AuthMiddleware<BlogBody>>(auth)
    async getBlog(req: CustomAuthRequest<undefined, CustomParams>, res: Response) {
        const { id } = req.params;
        const blog: Blog | null = await BlogModel.findById(id);
        if (!blog) {
            res.status(404).send({ message: `Blog Not found with following id ${id}` });
            return;
        }
        res.status(200).send(blog);

    }
    @post("/new")
    @use<AuthMiddleware<BlogBody>>(auth)
    async createBlog(req: CustomAuthRequest<BlogBody>, res: Response) {
        const { error } = blogValidator(req.body);
        if (error) {
            res.status(422).send({ message: error.details[0].message });
            return;
        }
        const { user } = req;
        const { title, description } = req.body;

        const blog: Blog = new BlogModel({
            user_id: user,
            title,
            description
        })

        await blog.save();
        res.status(200).send(blog)

    }


}