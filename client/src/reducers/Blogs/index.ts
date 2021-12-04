import { BlogsTypes, resetBlogsAction, setBlogsAction, setBlogsError, setBlogsLoading } from "../../actions/Types";
import { initState } from "./initState";
import { BlogsState } from "./Types";


const reducer = (state: BlogsState = initState, action: setBlogsAction | setBlogsError | setBlogsLoading | resetBlogsAction): BlogsState => {
    switch (action.type) {
        case BlogsTypes.setBlogs:
            return { ...state, blogs: action.payload }
        case BlogsTypes.setBlogsLoading:
            return { ...state, loading: action.payload }
        case BlogsTypes.setBlogsError:
            return { ...state, error: action.payload }
        case BlogsTypes.resetBlogs:
            return { ...initState }
        default:
            return state
    }
}

export default reducer;