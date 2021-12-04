import { useState, useEffect, Dispatch } from "react";

export type useFormReturn = { value: string, error: string, isValid: boolean, blur: boolean, setValue: Dispatch<string>, setBlur: Dispatch<boolean> }
export const useForm = (message: string): useFormReturn => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [isValid, setValid] = useState(false);
    const [blur, setBlur] = useState(false);

    useEffect(() => {
        if (value.length === 0) {
            setValid(false);
            setError(message);
        } else {
            if (error.length !== 0) {
                setValid(true);
                setError("");
            }
        }
    }, [value, blur]);
    return { value, error, isValid, blur, setValue, setBlur };
}