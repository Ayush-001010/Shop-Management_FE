import type { Dayjs } from "dayjs";
import type { FormikProps } from "formik";

export default interface IDateUI {
    placeholder?: string;
    maxDate?: Dayjs;
    formik: FormikProps<any>;
    backendName: string;
    disabled?: boolean;
    disabledFieldValueDependsOn? : string;
    disabledFieldValue?: string;
    minDate?:Dayjs;
}