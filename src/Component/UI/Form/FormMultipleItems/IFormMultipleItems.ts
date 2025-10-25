import type { FormikProps } from "formik";
import type IFormFieldsInterface from "../../../../Services/Interface/FormFieldsInterface";

export default interface IFormMultipleItems {
    formFieldsConfig: IFormFieldsInterface;
    formik: FormikProps<any>;
    noOfForms: number;
    increaseNoOfForms: (value: Record<string, any>) => void;
    decreaseNoOfForms : (value : Record<string, any> , shopNumber : number) => void;
    options: Record<string, any>;
}