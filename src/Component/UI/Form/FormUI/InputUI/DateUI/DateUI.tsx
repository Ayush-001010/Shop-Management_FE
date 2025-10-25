import React from "react";
import type IDateUI from "./IDateUI";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import styles from "./DateUI.module.css";
import ErrorUI from "../../ErrorUI/ErrorUI";

const DateUI: React.FunctionComponent<IDateUI> = ({
    placeholder,
    maxDate,
    formik,
    backendName,
    disabled,
    disabledFieldValue,
    disabledFieldValueDependsOn,
    minDate
}) => {

    const dateValue: Dayjs | null = formik.values[backendName] && dayjs(formik.values[backendName]).isValid() ? dayjs(formik.values[backendName]) : null;


    const changeHandler = (date: Dayjs | null) => {
        const jsDate = date ? date.toDate() : null;
        formik.setFieldValue(backendName, jsDate);
      };
      

    const isDisabled =
        disabled &&
        ((!disabledFieldValue && !disabledFieldValueDependsOn) ||
            formik.values[disabledFieldValueDependsOn as any] !== disabledFieldValue);

    return (
        <div className="flex flex-col w-full">
            <DatePicker
                value={dateValue ?? undefined}
                className={styles.datePickerCss}
                placeholder={placeholder}
                disabled={isDisabled}
                onChange={changeHandler}
                disabledDate={(current) =>
                    maxDate ? current && current > dayjs(maxDate) : false
                }
                minDate={minDate}
            />
            {formik.touched[backendName] && (
                <ErrorUI error={formik.errors[backendName] as string} />
            )}
        </div>
    );
};

export default DateUI;
