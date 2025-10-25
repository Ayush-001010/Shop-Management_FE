import type { FormikProps } from "formik";
import type { IFormFieldsSectionInterface } from "../../../../../../Services/Interface/FormFieldsInterface";

export default interface ITextUI {
    formik: FormikProps<any>;
    backendName: string;
    placeholder?: string;
    disabled?: boolean;
    disabledFieldValueDependsOn? : string;
    disabledFieldValue?: string;
    items: Array<IFormFieldsSectionInterface>;
    textFieldType?:"number" | "password";
}