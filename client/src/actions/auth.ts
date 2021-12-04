import { AxiosResponse } from "axios";
import api from "../api"
import { Dispatch, } from "redux";
import {
    AuthTypes,
    FormTypes,
    setAuthAction,
    setUserAction,
    setFormLoadingAction,
    setFormErrorAction,
    User,
    setAuthLoadingAction,
    resetBlogsAction,
    resetFormAction,
    BlogsTypes
} from "./Types";
import { returnError } from "../utils";
import { localStorageTypes } from "../Enums";

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    fname: string;
    email: string;
    password: string;
}
export const loginActionCreater = (data: LoginData, cb: () => void = () => { }) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch<setFormLoadingAction>({ type: FormTypes.setFormLoading, payload: true });
            const response = await api.post<User, AxiosResponse<User>, LoginData>("/auth/login", data);
            const token = response.headers["authorization"];
            localStorage.setItem(localStorageTypes.authorization, token);
            dispatch<setAuthAction>({ type: AuthTypes.setAuth, payload: true });
            dispatch<setUserAction>({ type: AuthTypes.setUser, payload: response.data })
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

export const registerActionCreater = (data: RegisterData) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch<setFormLoadingAction>({ type: FormTypes.setFormLoading, payload: true });
            const response = await api.post<User, AxiosResponse<User>, LoginData>("/auth/register", data);
            const token = response.headers["authorization"];
            localStorage.setItem(localStorageTypes.authorization, token);
            dispatch<setAuthAction>({ type: AuthTypes.setAuth, payload: true });
            dispatch<setUserAction>({ type: AuthTypes.setUser, payload: response.data })
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

export const getUser = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch<setAuthLoadingAction>({ type: AuthTypes.setLoading, payload: true });
            const response = await api.get<User>("/me");
            dispatch<setUserAction>({ type: AuthTypes.setUser, payload: response.data });
            dispatch<setAuthAction>({ type: AuthTypes.setAuth, payload: true });
        } catch (err) {
            dispatch<setAuthLoadingAction>({ type: AuthTypes.setLoading, payload: false });
        } finally {
            dispatch<setAuthLoadingAction>({ type: AuthTypes.setLoading, payload: false });

        }
    }
}

export const logout = () => {
    return (dispatch: Dispatch) => {
        localStorage.removeItem(localStorageTypes.authorization);
        dispatch<setAuthAction>({ type: AuthTypes.setAuth, payload: false });
        dispatch<setUserAction>({ type: AuthTypes.setUser, payload: {} });

        dispatch<resetBlogsAction>({ type: BlogsTypes.resetBlogs })
    }
}