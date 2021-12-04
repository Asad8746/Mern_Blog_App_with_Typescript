import { FormEvent, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Message, Container, Loader } from "../Components";
import { InputTypes, LoaderSizes, MessageTypes } from "../Enums";
import { registerActionCreater } from "../actions";
import { FormTypes } from "../actions/Types";
import { RootState } from "../reducers/Types";
import { useForm } from "../hooks";
export const Register = () => {
    const userName = useForm("Name is Required");
    const email = useForm("Email is Required");
    const password = useForm("Password is Required");
    const dispatch = useDispatch();
    const isDisabled = !userName.isValid || !email.isValid || !password.isValid
    const { error, loading } = useSelector((state: RootState) => state.form);
    useEffect(() => {
        return () => {
            dispatch({ type: FormTypes.resetForm })
        }
    }, [dispatch]);
    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(registerActionCreater({ fname: userName.value, email: email.value, password: password.value }))
    }



    const onUserNameChange = useCallback((value: string): void => {
        userName.setValue(value);
    }, [userName])
    const onEmailChange = useCallback((value: string): void => {
        email.setValue(value);
    }, [email])
    const onPasswordChange = useCallback((value: string): void => {
        password.setValue(value);
    }, [password])
    const onUserNameBlur = useCallback((): void => {
        userName.setBlur(true);
    }, [userName])
    const onEmailBlur = useCallback((): void => {
        email.setBlur(true);
    }, [email])
    const onPasswordBlur = useCallback((): void => {
        password.setBlur(true);
    }, [password])
    return (
        <Container>
            <div className="ui left aligned segment" >
                <h3 className="ui dividing header">Signup to Blogster</h3>
                <form className="ui form" onSubmit={onFormSubmit}>
                    <Input
                        value={userName.value}
                        inputId="register-name"
                        label="Name"
                        onChange={onUserNameChange}
                        placeholder="Name"
                        onBlur={onUserNameBlur}
                        isBlur={userName.blur}
                        error={userName.error}
                    />
                    <Input
                        value={email.value}
                        type={InputTypes.email}
                        inputId="register-email"
                        label="Email"
                        onChange={onEmailChange}
                        placeholder="Email"
                        onBlur={onEmailBlur}
                        isBlur={email.blur}
                        error={email.error}
                    />
                    <Input
                        value={password.value}
                        type={InputTypes.password}
                        inputId="register-password"
                        label="Password"
                        onChange={onPasswordChange}
                        placeholder="Password"
                        onBlur={onPasswordBlur}
                        isBlur={password.blur}
                        error={password.error}
                    />
                    {
                        error && <Message type={MessageTypes.error} message={error} />
                    }
                    <button className="ui primary button" disabled={isDisabled} >
                        {
                            loading ? <Loader size={LoaderSizes.mini} isInline /> : "Register"
                        }
                    </button>
                </form>
            </div>
        </Container>
    )
}