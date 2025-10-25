import type { FormikProps } from "formik";
import type { IFormFieldsSectionInterface } from "../../../../../../Services/Interface/FormFieldsInterface";

export default interface IShopCardContent {
    formik : FormikProps<any>;
    shopNumber : number;
    options: Record<string, any>;
    items: Array<IFormFieldsSectionInterface>;
    isUserDetailsRequired? : boolean;
}