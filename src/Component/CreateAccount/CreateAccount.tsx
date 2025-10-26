import React, { useEffect } from "react";
import { useState } from "react";
import type ICreateAccount from "./ICreateAccount";
import Timeline from "../UI/Timeline/Timeline";
import CreateAccountConfig from "../../Services/Config/CreateAccountConfig";
import Form from "../UI/Form/Form";
import type ICreateAccountInterface from "../../Services/Interface/CreateAccountInterface";
import useCreateAccount from "../../Services/CustomHook/useCreateAccount";
import type { IShopDetails } from "../../Services/Interface/CreateAccountInterface";
import { motion } from 'framer-motion';
import Review from "./Review/Review";
import { useDispatch } from "react-redux";
import { setCurrentFormFields } from "../../Redux/ChatBox";
import type { IFormFieldInterface } from "../../Services/Interface/FormFieldsInterface";

const CreateAccount: React.FunctionComponent<ICreateAccount> = () => {
    const { genratedInitialValues, genratedFormInitialValues } = useCreateAccount();
    const [value, setValue] = useState<ICreateAccountInterface | undefined>(undefined);
    const [formInitialValues, setFormInitialValues] = useState<Record<string, any> | undefined>(undefined);
    const [noOfShops, setNoOfShops] = useState<number>(0);
    const [stepValue, setStepValue] = useState(0);
    const dispatch = useDispatch();

    const takingDataFromForm = (data: any, noOfShopsValue?: number) => {
        if (noOfShopsValue === null || noOfShopsValue === undefined) {
            noOfShopsValue = 0;
        }
        switch (stepValue) {
            case 0: {
                let noOfShopsVal = data.NumberOfShops === "1-10" ? 1 : data.NumberOfShops === "11-50" ? 11 : 50;
                setNoOfShops(noOfShopsVal);
                setValue((prev) => {
                    if (prev) {
                        return { ...prev, ...data };
                    }
                    return data;
                });
                break;
            }
            case 1: {
                setValue((prev: any) => {
                    const ShopDetails: Array<IShopDetails> = [];
                    for (let i = 0; i < noOfShopsValue; i++) {
                        ShopDetails.push({
                            shopname: data[`shopname_${i + 1}`],
                            state: data[`state_${i + 1}`],
                            city: data[`city_${i + 1}`],
                            address: data[`address_${i + 1}`],
                            shopcontactnumber: data[`shopcontactnumber_${i + 1}`],
                            shopemail: data[`shopemail_${i + 1}`],
                            shoptype: data[`shoptype_${i + 1}`],
                            leaseownername: data[`leaseownername_${i + 1}`],
                            leasestartdate: new Date(data[`leasestartdate_${i + 1}`]),
                            leaseenddate: new Date(data[`leaseenddate_${i + 1}`]),
                            userName: "",
                            userpassword: "",
                            userconfirmpassword: "",
                            userEmail: "",
                            userphonenumber: ""
                        });
                    }
                    return { ...prev, shopDetails: ShopDetails };
                })
                setNoOfShops(noOfShopsValue);
                break;
            }
            case 2: {
                setValue((prev: any) => {
                    const ShopDetails: Array<IShopDetails> = [];
                    for (let i = 0; i < noOfShops; i++) {
                        ShopDetails.push({
                            shopname: data[`shopname_${i + 1}`],
                            state: data[`state_${i + 1}`],
                            city: data[`city_${i + 1}`],
                            address: data[`address_${i + 1}`],
                            shopcontactnumber: data[`shopcontactnumber_${i + 1}`],
                            shopemail: data[`shopemail_${i + 1}`],
                            shoptype: data[`shoptype_${i + 1}`],
                            leaseownername: data[`leaseownername_${i + 1}`],
                            leasestartdate: isNaN(new Date(data[`leasestartdate_${i + 1}`]).getTime()) ? null : new Date(data[`leasestartdate_${i + 1}`]),
                            leaseenddate: isNaN(new Date(data[`leaseenddate${i + 1}`]).getTime()) ? null : new Date(data[`leaseenddate${i + 1}`]),
                            userName: data[`userName_${i + 1}`],
                            userpassword: data[`userpassword_${i + 1}`],
                            userconfirmpassword: data[`userconfirmpassword_${i + 1}`],
                            userEmail: data[`userEmail_${i + 1}`],
                            userphonenumber: data[`userphonenumber_${i + 1}`]
                        });
                    }
                    return { ...prev, shopDetails: ShopDetails };
                });
                break;
            }
            case 3: {
                setValue((prev: any) => {
                    return {
                        ...prev, adminDetails: {
                            adminUserName: data["adminUserName"],
                            adminPassword: data["adminPassword"],
                            adminConfirmPassword: data["adminConfirmPassword"],
                            adminUserEmail: data["adminUserEmail"]
                        }
                    }
                })
                break;
            }
        }

        setStepValue((prevStep) => {
            if (prevStep < CreateAccountConfig.timelineArr.length - 1) {
                return prevStep + 1;
            }
            return prevStep;
        });
    }
    const genratedFormInitialValuesFunc = () => {
        if (!value) return;
        switch (stepValue) {
            case 0: {
                const res = genratedFormInitialValues(value, "OrganizationDetails");
                setFormInitialValues(res);
                break;
            }
            case 1: {
                const res = genratedFormInitialValues(value, "ShopDetails");
                setFormInitialValues(res);
                break;
            }
            case 2: {
                const res = genratedFormInitialValues(value, "ShopUserDetails", noOfShops);
                setFormInitialValues(res);
                break;
            }
            case 3: {
                const res = genratedFormInitialValues(value, "AdminDetails");
                setFormInitialValues(res);
                break;
            }
        }
    }
    const editClickHandlerTimeline = (val: number) => {
        setStepValue(val);
    }

    useEffect(() => {
        genratedFormInitialValuesFunc();
    }, [value, stepValue]);
    useEffect(() => {
        const val = genratedInitialValues();
        setValue(val);
    }, [])
    useEffect(() => {
        let arr: Array<IFormFieldInterface> = [];
        switch (stepValue) {
            case 0: {
                CreateAccountConfig.formFieldsAccordingToTimeline["OrganizationDetails"].sections.map((section => section.fields)).forEach(fields => {
                    arr = [...arr, ...fields];
                })
                break;
            }
            case 1: {
                CreateAccountConfig.formFieldsAccordingToTimeline["ShopDetails"].sections.map((section => section.fields)).forEach(fields => {
                    arr = [...arr, ...fields];
                })
                break;
            }
            case 2: {
                CreateAccountConfig.formFieldsAccordingToTimeline["ShopUserDetails"].sections.map((section => section.fields)).forEach(fields => {
                    arr = [...arr, ...fields];
                })
                break;
            }
            case 3: {
                CreateAccountConfig.formFieldsAccordingToTimeline["AdminDetails"].sections.map((section => section.fields)).forEach(fields => {
                    arr = [...arr, ...fields];
                })
                break;
            }
        }
        dispatch(setCurrentFormFields({
            currentFormField: arr
        }));
    }, [stepValue])

    return (
        <motion.div initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}>
            <div className="flex mt-5">
                <Timeline items={CreateAccountConfig.timelineArr} currentTimelineIndex={stepValue} editClickHandler={editClickHandlerTimeline} />
                {stepValue === 0 && <Form initialValues={formInitialValues} fieldsDetails={CreateAccountConfig.formFieldsAccordingToTimeline["OrganizationDetails"]} buttonText="Continue" submitHandler={takingDataFromForm} notRequiredConfirmationDialog={true} />}
                {stepValue === 1 && <Form initialNoOfForms={noOfShops} initialValues={formInitialValues} fieldsDetails={CreateAccountConfig.formFieldsAccordingToTimeline["ShopDetails"]} buttonText="Continue" submitHandler={takingDataFromForm} notRequiredConfirmationDialog={true} />}
                {stepValue === 2 && <Form initialNoOfForms={noOfShops} initialValues={formInitialValues} fieldsDetails={CreateAccountConfig.formFieldsAccordingToTimeline["ShopUserDetails"]} buttonText="Continue" submitHandler={takingDataFromForm} notRequiredConfirmationDialog={true} />}
                {stepValue === 3 && <Form initialNoOfForms={noOfShops} initialValues={formInitialValues} fieldsDetails={CreateAccountConfig.formFieldsAccordingToTimeline["AdminDetails"]} buttonText="Continue" submitHandler={takingDataFromForm} notRequiredConfirmationDialog={true} />}
                {stepValue === 4 && <Review data={value as ICreateAccountInterface} />}
            </div>
        </motion.div>
    )
};

export default CreateAccount;