import { FormEvent, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, Message, Loader, Container } from "../Components";

import { InputTypes, LoaderSizes, MessageTypes, RoutesEnum } from "../Enums";

import { createBlog } from "../actions";
import { FormTypes } from "../actions/Types";
import { RootState } from "../reducers/Types";


import { useForm } from "../hooks";



export const CreateBlog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const title = useForm("Title is Required");
    const description = useForm("Desciption is Required");
    const { error, loading } = useSelector((state: RootState) => state.form);
    const disabled = !title.isValid || !description.isValid

    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(createBlog({
            title: title.value,
            description: description.value
        }, () => {
            navigate(RoutesEnum.blogsRoute)
        }))
    }
    useEffect(() => {
        return () => {
            dispatch({ type: FormTypes.resetForm })
        }
    }, [dispatch]);

    const onTitleChange = useCallback((value: string): void => {
        title.setValue(value);
    }, [title])
    const onDesciptionChange = useCallback((value: string): void => {
        description.setValue(value);
    }, [description])

    const onTitleBlur = useCallback((): void => {
        title.setBlur(true);
    }, [title])
    const onDesciptionBlur = useCallback((): void => {
        description.setBlur(true);
    }, [description])
    return (
        <Container>
            <div className="ui left aligned segment" >
                <h3 className="ui dividing header">Create New Blog</h3>
                <form className="ui form" onSubmit={onFormSubmit}>
                    <Input
                        value={title.value}
                        inputId="create-blog-title"
                        label="Title"
                        isBlur={title.blur}
                        onChange={onTitleChange}
                        onBlur={onTitleBlur}
                        placeholder="Tile"
                        error={title.error}
                        required
                    />
                    <Input
                        value={description.value}
                        inputId="create-blog-description"
                        label="Description"
                        type={InputTypes.textarea}
                        onChange={onDesciptionChange}
                        onBlur={onDesciptionBlur}
                        placeholder="Description"
                        isBlur={description.blur}
                        error={description.error}
                        required
                    />
                    {
                        error && <Message type={MessageTypes.error} message={error} />
                    }
                    <button className="ui primary button" disabled={disabled} >
                        {loading ? <Loader size={LoaderSizes.tiny} isInline /> : "Save"}
                    </button>
                </form>
            </div>
        </Container>
    )
}