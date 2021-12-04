import { Dispatch } from "redux"
import api from "../api"
import { returnError } from "../utils"
import { IBlog, transformBlogs, transformBlog } from "./transform"
import { BlogsTypes, setBlogsLoading, setBlogsAction, setBlogsError, CreateBlog, setFormLoadingAction, FormTypes, resetFormAction, setFormErrorAction, setBlogLoading, BlogTypes, setBlogError, setBlogAction, Blog } from "./Types"



export const getBlogs = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch<setBlogsLoading>({ type: BlogsTypes.setBlogsLoading, payload: true });
            const response = await api.get<IBlog[]>("/blogs");
            dispatch<setBlogsAction>({ type: BlogsTypes.setBlogs, payload: transformBlogs(response.data) })

        } catch (err: any) {
            returnError(err, (error) => {
                dispatch<setBlogsError>({ type: BlogsTypes.setBlogsError, payload: error });
            })
        }
        finally {
            dispatch<setBlogsLoading>({ type: BlogsTypes.setBlogsLoading, payload: false });

        }
    }
}

export const createBlog = (data: CreateBlog, cb: () => void) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch<setFormLoadingAction>({ type: FormTypes.setFormLoading, payload: true });
            await api.post<any, any, CreateBlog>("/blogs/new", data);
            cb()
            dispatch<resetFormAction>({ type: FormTypes.resetForm });
        } catch (err: any) {
            returnError(err, (error) => {
                dispatch<setFormErrorAction>({ type: FormTypes.setFormError, payload: error })
            })
        } finally {
            dispatch<setFormLoadingAction>({ type: FormTypes.setFormLoading, payload: false });

        }
    }
}

export const getBlog = (id: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch<setBlogLoading>({ type: BlogTypes.setBlogLoading, payload: true });
            const response = await api.get<IBlog>(`/blogs/${id}`);
            dispatch<setBlogAction>({ type: BlogTypes.setBlog, payload: transformBlog(response.data) });

        } catch (err: any) {
            returnError(err, (error) => {
                dispatch<setBlogError>({ type: BlogTypes.setBlogError, payload: error })
            })
        } finally {
            dispatch<setBlogLoading>({ type: BlogTypes.setBlogLoading, payload: false });
        }
    }
}