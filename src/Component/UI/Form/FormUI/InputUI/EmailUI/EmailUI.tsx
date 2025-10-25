import React from "react";
import type IEmailUI from "./IEmailUI";
import { Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import ErrorUI from "../../ErrorUI/ErrorUI";
import styles from "./EmailUI.module.css";

const EmailUI: React.FunctionComponent<IEmailUI> = ({ formik, backendName, placeholder, isDisabled }) => {

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        formik.setFieldValue(backendName, value);
    }
    const onBlurHandler = () => {
        formik.setFieldTouched(backendName, true);
    }
    return (
        <div className="flex flex-col w-full">
            <Input className={`${styles.InputCss}`} addonBefore={<MailOutlined />} defaultValue={formik.values[backendName]} onChange={changeHandler} placeholder={placeholder} onBlur={onBlurHandler} disabled={isDisabled} />
            {formik.touched[backendName] && <ErrorUI error={formik.errors[backendName] as string} />}
        </div>
    )
}

export default EmailUI;