import { FormState } from "./Types";
import { INIT_STATE } from "./initState";
import { FormTypes, resetFormAction, setFormErrorAction, setFormLoadingAction } from "../../actions/Types";
const reducer = (state = INIT_STATE, action: setFormLoadingAction | setFormErrorAction | resetFormAction): FormState => {
    switch (action.type) {
        case FormTypes.setFormError:
            return { ...state, error: action.payload };
        case FormTypes.setFormLoading:
            return { ...state, loading: action.payload };
        case FormTypes.resetForm:
            return { ...INIT_STATE }
        default:
            return state
    }
}
export default reducer;