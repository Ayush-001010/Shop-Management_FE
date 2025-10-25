import type { FormikProps } from "formik";
import type IFormFieldsInterface from "../../../../../../Services/Interface/FormFieldsInterface";

export default interface IShopCardHeader {
    shopNumber: number;
    formik: FormikProps<any>;
    formFieldsConfig: IFormFieldsInterface;
    decreaseNoOfForms : (value : Record<string, any> , shopNumber : number) => void;
    isUserDetailsRequired? : boolean;
}