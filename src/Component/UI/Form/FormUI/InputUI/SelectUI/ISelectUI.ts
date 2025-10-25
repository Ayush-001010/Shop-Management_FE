import type { FormikProps } from "formik";
import type { IOptionsInterface } from "../../../../../../Services/Interface/CommonInterface";
import type { IFormFieldsSectionInterface } from "../../../../../../Services/Interface/FormFieldsInterface";

export default interface ISelectUI {
    placeholder?: string;
    options: Array<IOptionsInterface>;
    formik: FormikProps<any>;
    backendName: string;
    isMultipleOptionSelect?: boolean;
    items: Array<IFormFieldsSectionInterface>;
    isDisabled? : boolean; 
}