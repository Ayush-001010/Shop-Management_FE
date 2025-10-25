import React from "react";
import type IRadioUI from "./IRadioUI";
import { Radio } from "antd";

const RadioUI: React.FC<IRadioUI> = ({ formik, backendName }) => {
    const changeHandler = ({ target }: any) => {
        formik.setFieldValue(backendName, target.value);
    }
    return (
        <div>
            <Radio.Group options={[
                {
                    value: true,
                    label: "Yes"
                },
                {
                    value: false,
                    label: "No"
                },
            ]} onChange={changeHandler} />
        </div>
    )
};

export default RadioUI;