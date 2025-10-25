import type { IOptionsInterface } from "./CommonInterface";
import { Dayjs } from "dayjs";


export interface IFormFieldInterface {
    displayName: string;
    backendName: string;
    type: "text" | "email" | "select" | "shops" | "products" | "date" | "textarea" | "password" | "number" | "radio";
    validation?: any;
    options?: Array<IOptionsInterface>;
    getOptionFromAPI?: boolean;
    backendURL?: string;
    disabled?: boolean;
    cardOptions?: Array<string>;
    helpfulDescription?: string;
    placeholder?: string;
    maxDate?: Dayjs;
    minDate?: Dayjs;
    dependentField?: string;
    dependentFieldFormula?: "AttachedWithDate";
    isMultipleOptionSelect?: boolean;
    isDisabledField?: boolean;
    isDisabledFieldValueDependsOn?: string;
    isDisabledFieldValue?: string;
    textFieldType?: "number";
    isDependentOption?: boolean;
    dependentOptionField?: string;
}

export interface IFormFieldsSectionInterface {
    type: "single" | "double";
    fields: Array<IFormFieldInterface>;
}

export default interface IFormFieldsInterface {
    header: string;
    formType?: "shopcards" | "shopusercards" | "productPlacement";
    sections: Array<IFormFieldsSectionInterface>;
}