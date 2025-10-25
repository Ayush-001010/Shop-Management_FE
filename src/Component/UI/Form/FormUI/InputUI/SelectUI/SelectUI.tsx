import React from 'react';
import type ISelectUI from './ISelectUI';
import { Select } from 'antd';
import styles from "./SelectUI.module.css";
import ErrorUI from '../../ErrorUI/ErrorUI';
import { useGetFormContextValue } from '../../../Form';

const SelectUI: React.FunctionComponent<ISelectUI> = ({ items, placeholder, options, formik, backendName, isMultipleOptionSelect, isDisabled }) => {
    const { fieldsDetails, getDependentOptionValue } = useGetFormContextValue();

    const changeHandler = async (newValue: string | string[]) => {
        items.forEach(item => {
            item.fields.forEach(field => {
                const { isDisabledFieldValue, backendName: backendNameDisabledField, isDisabledFieldValueDependsOn } = field;
                if (backendName.includes("_")) {
                    if (isDisabledFieldValueDependsOn === backendName.split("_")[0] && isDisabledFieldValue !== newValue) {
                        formik.setFieldValue(`${backendNameDisabledField}_${backendName.split("_")[1]}`, "");
                    }
                }
            })
        })
        await fieldsDetails.sections.map(async (section) => await section.fields.map(async (field) => {
            const { dependentOptionField } = field;
            if (backendName === dependentOptionField || backendName.split("_")[0] === dependentOptionField) {
                formik.setFieldValue(field.backendName, null);
                if (backendName === "RowNumber") {
                    await getDependentOptionValue(field.backendName , newValue as string , formik.values["ContainerName"]);
                } else {
                    await getDependentOptionValue(field.backendName, newValue as string);
                }
            }
        }))
        formik.setFieldValue(backendName, newValue);
    }
    const onBlurHandler = () => {
        formik.setFieldTouched(backendName, true);
    }

    return (
        <div className='flex flex-col w-full'>
            <Select disabled={isDisabled} value={formik.values[backendName] || null} mode={isMultipleOptionSelect ? "multiple" : undefined} className={styles.selectCss} placeholder={placeholder} options={options} onChange={changeHandler} onBlur={onBlurHandler} />
            {formik.touched[backendName] && formik.errors[backendName] && <ErrorUI error={formik.errors[backendName] as string} />}
        </div>
    )
};

export default SelectUI;