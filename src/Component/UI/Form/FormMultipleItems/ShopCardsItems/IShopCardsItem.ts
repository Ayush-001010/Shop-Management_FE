import type { FormikProps } from "formik";
import type IFormFieldsInterface from "../../../../../Services/Interface/FormFieldsInterface";

export default interface IShopCardsItem {
    noOfForms : number;
    formFieldsConfig : IFormFieldsInterface;
    formik : FormikProps<any>;
    decreaseNoOfForms : (value : Record<string, any> , shopNumber : number) => void;
    options: Record<string, any>;
    isUserDetailsRequired? : boolean;
}