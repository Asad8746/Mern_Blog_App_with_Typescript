export interface CreateBlog {
    title: string,
    description: string
}
export interface User {
    id?: string;
    name?: string;
    email?: string;
}

export interface Blog {
    _id: string,
    user_id: string,
    title: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
}
export enum AuthTypes {
    setAuth = 'SET_AUTH',
    setUser = 'SET_AUTH_USER',
    setLoading = 'SET_AUTH_LOADING',
    resetAuth = "RESET_AUTH"
}

export enum FormTypes {
    setFormLoading = "SET_FORM_LOADING",
    setFormError = "SET_FORM_ERROR",
    resetForm = "RESET_FORM"
}
export enum BlogsTypes {
    setBlogs = "SET_BLOGS",
    setBlogsLoading = "SET_BLOGS_LOADING",
    setBlogsError = "SET_BLOGS_ERROR",
    resetBlogs = "RESET_BLOGS"
}
export enum BlogTypes {
    setBlog = "SET_BLOG",
    setBlogLoading = "SET_BLOG_LOADING",
    setBlogError = "SET_BLOG_ERROR",
    resetBlog = "RESET_BLOG"
}

export interface setAuthAction {
    type: AuthTypes.setAuth,
    payload: boolean
}
export interface setAuthLoadingAction {
    type: AuthTypes.setLoading,
    payload: boolean
}
export interface setUserAction {
    type: AuthTypes.setUser;
    payload: User
}
export interface resetAuthAction {
    type: AuthTypes.resetAuth
}

export interface setFormLoadingAction {
    type: FormTypes.setFormLoading;
    payload: boolean
}
export interface setFormErrorAction {
    type: FormTypes.setFormError;
    payload: string
}

export interface resetFormAction {
    type: FormTypes.resetForm
}

export interface setBlogsAction {
    type: BlogsTypes.setBlogs,
    payload: Blog[]
}

export interface setBlogsLoading {
    type: BlogsTypes.setBlogsLoading,
    payload: boolean
}
export interface setBlogsError {
    type: BlogsTypes.setBlogsError,
    payload: string
}

export interface resetBlogsAction {
    type: BlogsTypes.resetBlogs
}

export interface setBlogAction {
    type: BlogTypes.setBlog,
    payload: Blog
}
export interface setBlogLoading {
    type: BlogTypes.setBlogLoading,
    payload: boolean
}
export interface setBlogError {
    type: BlogTypes.setBlogError,
    payload: string
}

export interface resetBlogAction {
    type: BlogTypes.resetBlog
}
