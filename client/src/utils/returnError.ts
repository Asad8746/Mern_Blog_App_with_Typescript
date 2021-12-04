import axios, { AxiosError } from "axios";

interface IError {
    message: string
}
export const returnError = (err: Error | AxiosError<IError>, cb: (error: string) => void) => {
    if (axios.isAxiosError(err) && err.response?.data.message) {
        const { message } = err.response.data;
        cb(message);
    }
}