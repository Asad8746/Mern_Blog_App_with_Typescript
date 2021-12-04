import { Blog } from "../../actions/Types";

export interface BlogState {
    blog: Blog;
    loading: boolean;
    error: string
}


