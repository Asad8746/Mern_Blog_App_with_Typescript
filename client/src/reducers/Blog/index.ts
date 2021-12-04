import { BlogTypes, resetBlogAction, setBlogAction, setBlogError, setBlogLoading } from "../../actions/Types";
import { initState } from "./initState";
import { BlogState } from "./Types";


const reducer = (state: BlogState = initState, action: setBlogAction | setBlogError | setBlogLoading | resetBlogAction): BlogState => {
    switch (action.type) {
        case BlogTypes.setBlog:
            return { ...state, blog: action.payload }
        case BlogTypes.setBlogLoading:
            return { ...state, loading: action.payload }
        case BlogTypes.setBlogError:
            return { ...state, error: action.payload }
        case BlogTypes.resetBlog:
            return { ...initState }
        default:
            return state
    }
}

export default reducer;