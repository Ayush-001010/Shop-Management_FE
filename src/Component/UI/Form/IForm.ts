import type IFormFieldsInterface from "../../../Services/Interface/FormFieldsInterface";

export default interface IForm {
    fieldsDetails: IFormFieldsInterface;
    buttonText?: string;
    submitHandler: (value: Record<string, any>, noOfItems?: number) => void;
    initialValues?: Record<string, any>;
    initialNoOfForms?: number;
    headerCss?: string;
    isRowByRow?: boolean;
    notRequiredConfirmationDialog?: boolean;
    addFormItemUINotRequired?: boolean;
    hideSubmitButton?: boolean;
    customeFunc?: any;
}