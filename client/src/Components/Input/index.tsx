import React from "react";
import { InputTypes } from "../../Enums";

interface InputProps {
    label: string;
    placeholder: string;
    type?: InputTypes;
    inputId: string;
    value?: string;
    error?: string;
    isBlur?: boolean,
    onChange: (value: string) => void,
    onBlur: () => void,
    required?: boolean

}

const areEqual = (prevProps: InputProps, nextProps: InputProps) => {
    return prevProps.value === nextProps.value && prevProps.error === nextProps.error && prevProps.isBlur === nextProps.isBlur
}
export const Input = React.memo(({ label, type = InputTypes.text, inputId, value = "", placeholder, onChange, required = false, error = "", isBlur = false, onBlur }: InputProps): JSX.Element => {
    const onValueChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        onChange(e.target.value);
    }
    const onInputBlur = () => {
        onBlur();
    }
    return (
        <div className="field">
            <label htmlFor={inputId}>{label}</label>
            {
                type !== InputTypes.textarea ?
                    <input
                        id={inputId}
                        type={type}
                        value={value}
                        placeholder={placeholder}
                        onChange={onValueChange}
                        required={required}
                        onBlur={onInputBlur}

                    /> :
                    <textarea
                        style={{ resize: "none", overflowY: "auto" }}
                        id={inputId}
                        value={value}
                        placeholder={placeholder}
                        onChange={onValueChange}
                        required={required}
                        onBlur={onInputBlur}
                    />
            }

            {
                (isBlur && error) && (
                    <div className="ui negative message">
                        <p>{error}</p>
                    </div>

                )
            }

        </div>
    )
}, areEqual)


