import type { FormikProps } from "formik";

export default interface ITextArea {
        formik: FormikProps<any>;
        backendName: string;
        isDisabled?: boolean;
        placeholder?: string;
}