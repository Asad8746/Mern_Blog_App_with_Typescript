import { FormEvent, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, Message, Loader, Container } from "../Components";

import { InputTypes, LoaderSizes, MessageTypes, RoutesEnum } from "../Enums";

import { loginActionCreater } from "../actions";
import { RootState } from "../reducers/Types";

import { useForm } from "../hooks";
import { FormTypes } from "../actions/Types";


export const Login = () => {
    const navigate = useNavigate();
    const email = useForm("Email is Required");
    const password = useForm("Password is Required");
    const { error, loading } = useSelector((state: RootState) => state.form);
    const disabled = !email.isValid || !password.isValid
    const dispatch = useDispatch();
    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(loginActionCreater({
            email: email.value,
            password: password.value
        }, () => {
            navigate(RoutesEnum.blogsRoute)
        }))
    }
    useEffect(() => {
        return () => {
            dispatch({ type: FormTypes.resetForm })
        }
    }, [dispatch]);
    const onEmailChange = useCallback((value: string): void => {
        email.setValue(value);
    }, [email])
    const onPasswordChange = useCallback((value: string): void => {
        password.setValue(value);
    }, [password])

    const onEmailBlur = useCallback((): void => {
        email.setBlur(true);
    }, [email])
    const onPasswordBlur = useCallback((): void => {
        password.setBlur(true);
    }, [password])
    return (
        <Container>
            <div className="ui left aligned segment" >
                <h3 className="ui dividing header">Login to Blogster</h3>
                <form className="ui form" onSubmit={onFormSubmit}>
                    <Input
                        value={email.value}
                        type={InputTypes.email}
                        inputId="login-email"
                        label="Email"
                        isBlur={email.blur}
                        onChange={onEmailChange}
                        onBlur={onEmailBlur}
                        placeholder="Email"
                        error={email.error}
                        required
                    />
                    <Input
                        value={password.value}
                        inputId="login-password"
                        label="Password"
                        type={InputTypes.password}
                        onChange={onPasswordChange}
                        onBlur={onPasswordBlur}
                        placeholder="Password"
                        isBlur={password.blur}
                        error={password.error}
                        required
                    />
                    {
                        error && <Message type={MessageTypes.error} message={error} />
                    }
                    <button className="ui primary button" disabled={disabled} >
                        {loading ? <Loader size={LoaderSizes.tiny} isInline /> : "Login"}
                    </button>
                </form>
            </div>
        </Container>
    )
}