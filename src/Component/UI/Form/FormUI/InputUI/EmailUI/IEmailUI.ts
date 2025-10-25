import type { FormikProps } from "formik";

export default interface IEmailUI {
    formik: FormikProps<any>;
    backendName: string;
    placeholder?: string;
    isDisabled ? : boolean;
}