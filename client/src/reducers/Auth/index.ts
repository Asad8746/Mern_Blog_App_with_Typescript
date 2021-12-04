import { AuthTypes, setAuthAction, setUserAction, setAuthLoadingAction, resetAuthAction } from "../../actions/Types";
import { initState } from "./initState";
import { AuthState } from "./Types";
const reducer = (state: AuthState = initState, action: setAuthAction | setUserAction | setAuthLoadingAction | resetAuthAction): AuthState => {
    switch (action.type) {
        case AuthTypes.setAuth:
            return { ...state, isAuth: action.payload }
        case AuthTypes.setUser:
            return { ...state, user: action.payload }
        case AuthTypes.setLoading:
            return { ...state, loading: action.payload }
        case AuthTypes.resetAuth:
            return { ...initState }
        default:
            return state

    }
}

export default reducer