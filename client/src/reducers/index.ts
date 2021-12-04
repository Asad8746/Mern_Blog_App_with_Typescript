import { combineReducers } from "redux";
import authReducer from "./Auth";
import formReducer from "./Form";
import blogsReducer from "./Blogs";
import blogReducer from "./Blog";
import { RootState } from "./Types";

export default combineReducers<RootState>({
    auth: authReducer,
    form: formReducer,
    blogs: blogsReducer,
    blog: blogReducer
})