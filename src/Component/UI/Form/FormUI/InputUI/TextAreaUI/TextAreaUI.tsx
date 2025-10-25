import React from "react";
import type ITextArea from "./ITextAreaUI";
import { Input } from "antd";
import ErrorUI from "../../ErrorUI/ErrorUI";

const TextAreaUI: React.FunctionComponent<ITextArea> = ({ formik, backendName, isDisabled, placeholder , }) => {

    const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        formik.setFieldValue(backendName, event.target.value);
    }
    const blurHandler = () => {
        formik.setFieldTouched(backendName, true);
    }
    return (
        <>
            <Input.TextArea placeholder={placeholder} defaultValue={formik.values[backendName]} onChange={changeHandler} onBlur={blurHandler} disabled={isDisabled} />
            {formik.touched[backendName] && <ErrorUI error={formik.errors[backendName] as string} />}
        </>
    )
}

export default TextAreaUI;