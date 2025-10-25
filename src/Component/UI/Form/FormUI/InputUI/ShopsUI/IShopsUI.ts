import type { FormikProps } from "formik";

export default interface IShopsUI {
    cardOptions : Array<string>;
    formik : FormikProps<any>;
    backendName : string;
}