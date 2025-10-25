import type { FormikProps } from "formik";

export default interface IPasswordUI {
    formik: FormikProps<any>;
    backendName: string;
    placeholder?: string;
}