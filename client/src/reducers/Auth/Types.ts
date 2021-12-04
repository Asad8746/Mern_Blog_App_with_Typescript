import { User } from "../../actions/Types";
export interface AuthState {
    isAuth: boolean;
    user: User;
    loading: boolean;
    error: string;
}