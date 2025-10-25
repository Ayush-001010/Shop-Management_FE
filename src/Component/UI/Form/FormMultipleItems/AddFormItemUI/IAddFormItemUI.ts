import type { FormikProps } from "formik";

export default interface IAddFormItemUI {
    increaseNoOfForms: (value: Record<string, any>) => void;
    formik: FormikProps<any>;
}