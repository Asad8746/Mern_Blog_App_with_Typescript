import { Blog } from "../../actions/Types";

export interface BlogsState {
    blogs: Blog[];
    loading: boolean;
    error: string
}


