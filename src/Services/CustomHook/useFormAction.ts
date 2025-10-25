import { useEffect, useState } from "react";
import type IFormFieldsInterface from "../Interface/FormFieldsInterface";
import * as Yup from "yup";
import type { IOptionsInterface } from "../Interface/CommonInterface";
import APICallingServices from "../APICallingService";
import type { IFormFieldInterface } from "../Interface/FormFieldsInterface";
import * as yup from "yup";
import { useParams } from "react-router-dom";

const useFormAction = (formFields: IFormFieldsInterface, initVal?: Record<string, string>, initialNoOfForms?: number) => {
    const [validationSchema, setValidationSchema] = useState<Record<string, any>>({});
    const [options, setOptions] = useState<Record<string, Array<IOptionsInterface>>>({});
    const [initialValues, setInitialValues] = useState<Record<string, any> | undefined>({});
    const [noOfForms, setNoOfForms] = useState<number>(1);
    const { id } = useParams();

    const genratedInitialValidationConfig = () => {
        const validationSchemaConfig: Record<string, any> = {};
        const isMultipleItems = formFields.formType;

        if (!isMultipleItems) {
            formFields.sections.forEach(section => {
                section.fields.forEach(field => {
                    const { backendName, validation } = field;
                    if (validation) {
                        validationSchemaConfig[backendName] = validation;
                    }
                })
            })
        } else {
            const type = formFields.formType;
            if (type === "productPlacement") {
                formFields.sections.forEach((section) => {
                    section.fields.map((field) => {
                        validationSchemaConfig[field.backendName] = field.validation;
                    })
                })
            } else {
                formFields.sections.forEach(section => {
                    if (!initialNoOfForms) initialNoOfForms = 1;
                    for (let i = 0; i < initialNoOfForms; i++) {
                        section.fields.forEach(field => {
                            const { backendName, validation } = field;
                            if (backendName !== "shopemail" && backendName !== "shopcontactnumber") {
                                if (validation) {
                                    validationSchemaConfig[`${backendName}_${i + 1}`] = validation;
                                }
                            } else if (backendName !== "shopcontactnumber") {
                                validationSchemaConfig[`${backendName}_${i + 1}`] = yup.string().email("Invalid email format").required("Shop Email is required").test(
                                    "unique-email",
                                    "This email is already used in another shop",
                                    function (value) {
                                        const { parent, path, createError } = this;
                                        if (!value) return true;
                                        const currentEmail = value.toLowerCase().trim();
                                        const allEmails = Object.entries(parent)
                                            .filter(([k]) => k.startsWith("shopemail_"))
                                            .map(([, v]) => (v as string)?.toLowerCase().trim())
                                            .filter((v) => v);
                                        const duplicates = allEmails.filter(email => email === currentEmail);
                                        if (duplicates.length > 1) {
                                            return createError({ path, message: "This email is already used in another shop" });
                                        }
                                        return true;
                                    }
                                );
                            } else {
                                validationSchemaConfig[`${backendName}_${i + 1}`] = yup.string().required("Shop Contact Number is required").matches(/^\d{10}$/, "Shop Contact Number must be a valid 10-digit number").test(
                                    "unique-phoneNumber",
                                    "Looks like this phone number is already in use by another shop.",
                                    function (value) {
                                        const { parent, path, createError } = this;
                                        if (!value) return true;
                                        const currentPhoneNumber = value.toLowerCase().trim();
                                        const allPhoneNumber = Object.entries(parent)
                                            .filter(([k]) => k.startsWith("shopcontactnumber_"))
                                            .map(([, v]) => (v as string)?.toLowerCase().trim())
                                            .filter((v) => v);
                                        const duplicates = allPhoneNumber.filter(phoneNumber => phoneNumber === currentPhoneNumber);
                                        if (duplicates.length > 1) {
                                            return createError({ path, message: "Looks like this phone number is already in use by another shop." });
                                        }
                                        return true;
                                    }
                                );
                            }
                        });
                    }
                })
            }
        }

        setValidationSchema(Yup.object().shape(validationSchemaConfig));
    }
    const genrateOptions = async () => {
        let optionsVal: Record<string, Array<IOptionsInterface>> = {};
        for (const section of formFields.sections) {
            for (const field of section.fields) {
                let { type, getOptionFromAPI, options, backendURL, backendName, isDependentOption } = field;
                if (type === "select") {
                    let opt: Array<IOptionsInterface> = [];
                    if (options) {
                        options.forEach(item => opt.push(item));
                    } else if (getOptionFromAPI && !isDependentOption) {
                        const apiObj = new APICallingServices();
                        if (backendURL?.includes("shopInventory")) {
                            backendURL += `?type=Container&ShopID=${id}`;
                        }
                        const response = await apiObj.getDataFromBackend(backendURL || "");
                        if (response.success) {
                            const { data } = response;
                            if (backendURL === "/master/productType" || backendURL === "/authentication/option?type=Product_Type") {
                                for (const item of data) {
                                    opt.push({ label: item.ProductType, value: item.ProductType });
                                }
                            } else if (backendURL === "/authentication/option?type=State_Master") {
                                for (const item of data) {
                                    opt.push({ label: item.State, value: item.State });
                                }
                            } else if (backendURL === `/shopInventory/getoption?type=Container&ShopID=${id}`) {
                                for (const item of data) {
                                    opt.push({ label: item.Name, value: item.ID });
                                }
                            }
                        }
                    }
                    optionsVal[backendName] = opt;
                }
            }
        }
        setOptions(optionsVal);
    }
    const genratedInitialValues = () => {
        const initialVal: Record<string, any> = {};
        const isMultipleItems = formFields.formType;
        if (!isMultipleItems) {
            formFields.sections.forEach(section => {
                section.fields.forEach((field) => {
                    const { backendName } = field;
                    initialVal[backendName] = initVal && initVal[backendName] ? initVal[backendName] : null;
                });
            });
        } else {
            const type = formFields.formType;
            if (type === "productPlacement") {
                formFields.sections.forEach((section) => {
                    section.fields.map((field) => {
                        initialVal[field.backendName] = null;
                    })
                })
            } else {
                if (!initialNoOfForms) initialNoOfForms = 1;
                for (let i = 0; i < initialNoOfForms; i++) {
                    formFields.sections.forEach(section => {
                        section.fields.forEach((field) => {
                            const { backendName } = field;
                            initialVal[`${backendName}_${i + 1}`] = initVal && initVal[`${backendName}_${i + 1}`] ? initVal[`${backendName}_${i + 1}`] : null;
                        });
                    });
                }
                setNoOfForms(initialNoOfForms);
            }
        }
        setInitialValues(initialVal);
    }
    const increaseNoOfForms = (value: Record<string, any>) => {
        let newValidationSchema: Record<string, any> = { ...validationSchema.fields };
        let newInitialValues: Record<string, any> = { ...value };
        const newIndex = noOfForms + 1;
        formFields.sections.forEach(section => {
            section.fields.forEach(field => {
                const { backendName } = field;
                if (field.validation) {
                    newValidationSchema = { ...newValidationSchema, [`${backendName}_${newIndex}`]: field.validation };
                }
                newInitialValues = { ...newInitialValues, [`${backendName}_${newIndex}`]: "" };
            });
        });
        setNoOfForms(newIndex);
        setValidationSchema(Yup.object().shape(newValidationSchema));
        setInitialValues(newInitialValues);
    }
    const decreaseNoOfForms = (value: Record<string, any>, shopNumber: number) => {
        if (shopNumber === 1) return;
        let newValidationSchema: Record<string, any> = {};
        let newInitialValues: Record<string, any> = {};
        const schemaKeys = Object.keys(validationSchema.fields);
        for (let i = 0; i < schemaKeys.length; i++) {
            const key = schemaKeys[i];
            if (!key.endsWith(`_${shopNumber}`)) {
                newValidationSchema[key] = validationSchema.fields[key];
            }
        }
        const initialValuesKeys = Object.keys(value);
        for (let i = 0; i < initialValuesKeys.length; i++) {
            const key = initialValuesKeys[i];
            if (!key.endsWith(`_${shopNumber}`)) {
                newInitialValues[key] = value[key];
            }
        }
        const newIndex = noOfForms - 1;
        setNoOfForms(newIndex);
        setValidationSchema(Yup.object().shape(newValidationSchema));
        setInitialValues(newInitialValues);
    }
    const getDependentOptionValue = async (backendName: string, dependentFieldValue: any, extraValue?: any) => {
        let config: IFormFieldInterface | null = null;
        formFields.sections.forEach(section => {
            const arr = section.fields.filter(field => field.backendName === backendName);
            if (arr.length > 0) {
                config = arr[0];
            }
        });
        if (config) {
            const { backendURL, backendName, getOptionFromAPI } = config;
            if (getOptionFromAPI) {
                let url: string = backendURL
                if (url.includes("shopInventory")) {
                    if (backendName === "ColumnNumber") {
                        url += `?type=ColumnNumber&ContainerID=${extraValue}&RowID=${dependentFieldValue}`;
                    } else {
                        url += `?type=RowNumber&ContainerID=${dependentFieldValue}`;
                    }
                }
                const apiObj = new APICallingServices();
                const response = await apiObj.getDataFromBackend(url, { dependentValue: dependentFieldValue });
                const { success, data } = response;
                if (success) {
                    const opt: Array<IOptionsInterface> = [];
                    if (url.includes("shopInventory")) {
                        if (backendName === "ColumnNumver") {
                            for (const item of data) {
                                opt.push({ label: item.ColumnNumber, value: item.ID });
                            }
                        } else {
                            for (const item of data) {
                                opt.push({ label: item.RowNumber, value: item.ID });
                            }
                        }
                    } else {
                        for (const item of data) {
                            opt.push({ label: item.City, value: item.City });
                        }
                    }
                    setOptions((prevState: any) => {
                        return { ...prevState, [backendName]: opt }
                    })
                }
            }
        }
    }

    useEffect(() => {
        setInitialValues({});
        genratedInitialValues();
    }, [initVal])
    useEffect(() => {
        setInitialValues({});
        setValidationSchema({});
        setOptions({});
        genratedInitialValidationConfig();
        genrateOptions();
        genratedInitialValues();
    }, [formFields, initialNoOfForms]);

    return { validationSchema, options, initialValues, noOfForms, increaseNoOfForms, decreaseNoOfForms, getDependentOptionValue };
};

export default useFormAction;