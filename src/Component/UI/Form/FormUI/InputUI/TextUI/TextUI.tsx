import React from "react";
import type ITextUI from "./ITextUI";
import { Input } from "antd";
import styles from "./TextUI.module.css";
import ErrorUI from "../../ErrorUI/ErrorUI";
import type { IFormFieldInterface } from "../../../../../../Services/Interface/FormFieldsInterface";

const TextUI: React.FunctionComponent<ITextUI> = ({ backendName, textFieldType, formik, placeholder, disabled, items, disabledFieldValue, disabledFieldValueDependsOn }) => {

    const isDependentField = () => {
        let isDependent = false;
        let itemValue: IFormFieldInterface | undefined = undefined as IFormFieldInterface | undefined;
        items.forEach(item => {
            item.fields.forEach(field => {
                if (field.dependentField && field.dependentField === backendName) {
                    isDependent = true;
                    itemValue = field;
                }
            })
        });
        return { isDependent, item: itemValue };
    }
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        formik.setFieldValue(backendName, value);
        let res = isDependentField();
        if (res.isDependent && res.item?.dependentFieldFormula) {
            switch (res.item.dependentFieldFormula) {
                case "AttachedWithDate": {
                    const currentDate = new Date();
                    const noWhiteSpaceValue = value.replace(/\s/g, "_");
                    const newValueOfDependentField = `${noWhiteSpaceValue}_${currentDate.getFullYear()}_${currentDate.getMonth() + 1}_${currentDate.getDate()}_${currentDate.getHours()}_${currentDate.getMinutes()}_${currentDate.getSeconds()}_${currentDate.getMilliseconds()}`;
                    formik.setFieldValue(res.item.backendName, newValueOfDependentField);
                    break;
                }
            }
        }
    }
    const onBlurHandler = () => {
        formik.setFieldTouched(backendName, true);
    }

    return (
        <div className="flex flex-col w-full">
            <Input type={textFieldType} className={styles.InputCss} defaultValue={formik.values[backendName]} onChange={changeHandler} placeholder={placeholder} disabled={disabled && ((!disabledFieldValue && !disabledFieldValueDependsOn) || (formik.values[disabledFieldValueDependsOn as any] !== disabledFieldValue))} onBlur={onBlurHandler} />
            {formik.touched[backendName] && <ErrorUI error={formik.errors[backendName] as string} />}
        </div>
    )
};

export default TextUI;