import React, { createContext, useContext, useEffect, useState } from 'react';
import type IForm from './IForm';
import { Formik } from 'formik';
import FormItems from './FormItems/FormItems';
import { Button } from 'antd';
import styles from './Form.module.css';
import FormMultipleItems from './FormMultipleItems/FormMultipleItems';
import useFormAction from '../../../Services/CustomHook/useFormAction';
import FormConfirmation from './FormConfirmation/FormConfirmation';
import type IFormFieldsInterface from '../../../Services/Interface/FormFieldsInterface';

interface IFormContext {
    isRowByRow?: boolean;
    openFormConfirmation: boolean;
    decisionHandler: (value: boolean) => void;
    getDependentOptionValue: (backendName: string, dependentFieldValue: string , extraValue?:string) => void;
    fieldsDetails: IFormFieldsInterface;
    addFormItemUINotRequired?: boolean;
    customeFunc?: any;
    options: Record<string, any>
}

const FormContextUI = createContext<IFormContext | undefined>(undefined);

export const useGetFormContextValue = () => {
    const context = useContext(FormContextUI);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
}

const Form: React.FunctionComponent<IForm> = ({ fieldsDetails, customeFunc, hideSubmitButton, isRowByRow, buttonText, addFormItemUINotRequired, submitHandler, initialValues: initVal, initialNoOfForms, headerCss, notRequiredConfirmationDialog }) => {
    const { validationSchema, options, initialValues, noOfForms, getDependentOptionValue, increaseNoOfForms, decreaseNoOfForms } = useFormAction(fieldsDetails, initVal, initialNoOfForms);
    const [initialVal, setInitalVal] = useState<Record<string, any> | undefined>({});
    const [openFormConfirmation, setOpenFormConfirmation] = useState<boolean>(false);
    const [value, setValue] = useState<any>(null);

    const openFormConfirmationHandler = (values: any) => {
        if (notRequiredConfirmationDialog) {
            submitHandler(values, noOfForms);
            return;
        }
        setOpenFormConfirmation(true);
        setValue(values);
    }
    const decisionHandler = (decision: boolean) => {
        if (decision) {
            submitHandler(value, noOfForms);
        }
        setOpenFormConfirmation(false);
    }
    const buttonTextValue = () => {
        switch (buttonText) {
            case "Continue": return <span className='font-normal'>Continue<i className="px-1 font-bold bi bi-arrow-right" /></span>
            case "Submit": return <span className='font-normal'>Submit</span>
            case "Update": return <span className='font-normal'>Update</span>
            default: return <span className='font-normal'>{buttonText}</span>
        }
    }
    useEffect(() => {
        setInitalVal(undefined);
        setInitalVal(initialValues);
    }, [initialValues])

    return (
        <FormContextUI.Provider value={{ fieldsDetails, options, customeFunc, isRowByRow, addFormItemUINotRequired, openFormConfirmation, decisionHandler, getDependentOptionValue }}>
            <div className="container mt-10">
                <div>
                    <h1 className={`${headerCss ? headerCss : "text-2xl font-normal"}`}>
                        {fieldsDetails.header}
                    </h1>
                </div>
                <div className="m-7">
                    {initialVal && Object.keys(initialVal).length > 0 && <Formik initialValues={{ ...initialVal }} validationSchema={validationSchema} onSubmit={openFormConfirmationHandler} enableReinitialize={true}>
                        {formik => (
                            <form onSubmit={formik.handleSubmit}>
                                {!fieldsDetails.formType && <FormItems items={fieldsDetails.sections} formik={formik} options={options} />}
                                {fieldsDetails.formType !== undefined && <FormMultipleItems decreaseNoOfForms={decreaseNoOfForms} noOfForms={noOfForms} formFieldsConfig={fieldsDetails} formik={formik} increaseNoOfForms={increaseNoOfForms} options={options} />}
                                {!hideSubmitButton && <div className='flex justify-center mt-2 h-px my-8 bg-gray-200 border-0 dark:bg-gray-200'>
                                    <Button htmlType='submit' className={`w-50 m-2 ${styles.buttonCss}`} >
                                        {buttonTextValue()}
                                    </Button>
                                </div>}
                            </form>
                        )}
                    </Formik>}
                </div>
                <FormConfirmation />
            </div>
        </FormContextUI.Provider>
    )
};

export default Form;