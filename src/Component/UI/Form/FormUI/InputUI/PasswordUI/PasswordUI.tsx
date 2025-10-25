import React from "react";
import { Input } from "antd";
import ErrorUI from "../../ErrorUI/ErrorUI";
import type IPasswordUI from "./IPasswordUI";

const PasswordUI: React.FunctionComponent<IPasswordUI> = ({ backendName, formik, placeholder }) => {
    
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        formik.setFieldValue(backendName, value);
    }
    const onBlurHandler = () => {
        formik.setFieldTouched(backendName, true);
    }

    return (
        <div className="flex flex-col w-full">
            <Input.Password  defaultValue={formik.values[backendName]} onChange={changeHandler} placeholder={placeholder}  onBlur={onBlurHandler} />
            {formik.touched[backendName] && <ErrorUI error={formik.errors[backendName] as string} />}
        </div>
    )
};

export default PasswordUI;