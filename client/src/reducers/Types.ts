import { AuthState } from "./Auth/Types";
import { FormState } from "./Form/Types";
import { BlogsState } from "./Blogs/Types";
import { BlogState } from "./Blog/Types";
export interface RootState {
    auth: AuthState
    form: FormState
    blogs: BlogsState
    blog: BlogState
}