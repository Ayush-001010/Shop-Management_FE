import type { FormikProps } from "formik";
import type { IFormFieldsSectionInterface } from "../../../../Services/Interface/FormFieldsInterface";

export default interface IFormItems {
    items : Array<IFormFieldsSectionInterface>;
    formik : FormikProps<any>;
    options: Record<string, any>;
}