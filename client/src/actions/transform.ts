import { Blog } from "./Types";
export interface IBlog {
    _id: string,
    user_id: string,
    title: string,
    description: string,
    createdAt: string,
    updatedAt: string,

}

export const transformBlog = (blog: IBlog): Blog => {
    return {
        ...blog,
        createdAt: new Date(blog.createdAt),
        updatedAt: new Date(blog.updatedAt)
    }
}
export const transformBlogs = (blogs: IBlog[]): Blog[] => {
    return blogs.map(transformBlog);
}