import type IFormFieldsInterface from "../Interface/FormFieldsInterface";
import type ITimelineInterface from "../Interface/TimelineInterface";
import * as yup from "yup";
import dayjs from "dayjs";

export interface ICreateAccountFormConfig {
    OrganizationDetails: IFormFieldsInterface;
    ShopDetails: IFormFieldsInterface;
    ShopUserDetails: IFormFieldsInterface;
    AdminDetails: IFormFieldsInterface;
}

export default class CreateAccountConfig {
    static readonly regax = /^[A-Z a-z ( ) , \s]+$/;
    static readonly passwordRegax = /^(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    static readonly phoneNumberRegex = /^\d{10}$/;
    static readonly today = dayjs();
    static readonly timelineArr: Array<ITimelineInterface> = [
        {
            title: "Organization Details",
            description: "In this section, you will provide the basic information about your organization like name , founding date , number of shops etc.",
            isEditTextRequired: true
        },
        {
            title: "Shop Details",
            description: "In this section, you will provide the details of your shop like name , address , contact number etc.",
            isEditTextRequired: true
        },
        {
            title: "Show User Details",
            description: "In this section, you will provide the details of the users who will be managing the shop like name , email , contact number , password etc.",
            isEditTextRequired: true
        },
        {
            title: "Admin Details",
            description: "In this section, you will provide the details of the admin who will be managing the organization like name , email , contact number , password etc.",
            isEditTextRequired: true
        },
        {
            title: "Review & Submit",
            description: "In this section, you will review all the details you have provided and submit the form to create your account.",
            isEditTextRequired: false
        }
    ];
    static readonly formFieldsAccordingToTimeline: ICreateAccountFormConfig = {
        OrganizationDetails: {
            header: "About Your Organization",
            sections: [
                {
                    type: "single",
                    fields: [
                        {
                            displayName: "Organization ID",
                            backendName: "organizationId",
                            type: "text",
                            disabled: true,
                            helpfulDescription: "This is your unique organization ID, which will be used to identify your organization.",
                            placeholder: "Ex: org-1234567890",
                            validation: null,
                            dependentField: "OrganizationName",
                            dependentFieldFormula: "AttachedWithDate"
                        }
                    ]
                },
                {
                    type: "double",
                    fields: [
                        {
                            displayName: "Organization Name",
                            backendName: "OrganizationName",
                            type: "text",
                            validation: yup.string().required("Organization Name is required").min(5, "Organization Name must be at least 5 characters long").max(50, "Organization Name must be at most 50 characters long").matches(this.regax, "Organization Name can only contain letters, spaces, and commas"),
                            helpfulDescription: "Please enter the full name of you organization.",
                            placeholder: "Ex: ABC Retailers"
                        },
                        {
                            displayName: "Founder Name",
                            backendName: "FounderName",
                            type: "text",
                            validation: yup.string().required("Founder Name is required").min(5, "Founder Name must be at least 5 characters long").max(50, "Founder Name must be at most 50 characters long").matches(this.regax, "Founder Name can only contain letters, spaces, and commas"),
                            helpfulDescription: "Please enter the full name of the founder.",
                            placeholder: "Ex: John"
                        },
                        {
                            displayName: "Contact Phone Number",
                            backendName: "ContactPhoneNumber",
                            type: "text",
                            validation: yup.string().required("Contact Phone Number is required").matches(this.phoneNumberRegex, "Contact Phone Number must be a valid 10-digit number"),
                            helpfulDescription: "Please enter the contact phone number of your organization.",
                            placeholder: "Ex: 1234567890"
                        },
                        {
                            displayName: "Contact Email",
                            backendName: "ContactEmail",
                            type: "email",
                            validation: yup.string().email("Invalid email format").required("Contact Email is required"),
                            helpfulDescription: "Please enter the contact email address of your organization.",
                            placeholder: "Ex: texting@gmail.com"
                        }
                    ]
                },
                {
                    type: "single",
                    fields: [
                        {
                            displayName: "Number of Shops",
                            backendName: "NumberOfShops",
                            type: "shops",
                            cardOptions: ["1-10", "11-50", "50+"],
                            helpfulDescription: "Please select the number of shops you have.",
                            validation: yup.string().required("Number of Shops is required"),
                        }
                    ]
                },
                {
                    type: "single",
                    fields: [
                        {
                            displayName: "Founding Date",
                            backendName: "FoundingDate",
                            type: "date",
                            validation: yup.date().required("Founding Date is required").max(new Date(), "Founding Date cannot be in the future"),
                            helpfulDescription: "Please select the founding date of your organization.",
                            placeholder: "Ex: 2020-01-01",
                            maxDate: this.today
                        },
                        {
                            displayName: "Organization Type",
                            backendName: "OrganizationType",
                            type: "select",
                            options: [
                                { label: "Private", value: "private" },
                                { label: "Public", value: "public" },
                                { label: "Non-Profit", value: "non-profit" }
                            ],
                            validation: yup.string().required("Organization Type is required"),
                            helpfulDescription: "Please select the type of your organization.",
                            placeholder: "Select Organization Type"
                        }
                    ]
                },
                {
                    type: "single",
                    fields: [
                        {
                            displayName: "Product Categories",
                            backendName: "ProductCategories",
                            type: "select",
                            helpfulDescription: "Please select the categories of products you sell.",
                            placeholder: "Select Product Categories",
                            validation: yup.array().required("Product Categories are required"),
                            isMultipleOptionSelect: true,
                            backendURL: "/authentication/option?type=Product_Type",
                            getOptionFromAPI: true
                        }
                    ]
                }
            ]
        },
        ShopDetails: {
            header: "About Your Shop",
            formType: "shopcards",
            sections: [
                {
                    type: "single",
                    fields: [
                        {
                            displayName: "Shop Name",
                            backendName: "shopname",
                            type: "text",
                            validation: yup.string().required("Shop Name is required").min(3, "Shop Name must be at least 3 characters long").max(50, "Shop Name must be at most 50 characters long").matches(CreateAccountConfig.regax, "Shop Name can only contain letters, spaces, and commas"),
                            helpfulDescription: "Please enter the full name of your shop.",
                            placeholder: "Ex: ABC Electronics"
                        }
                    ]
                },
                {
                    type: "double",
                    fields: [
                        {
                            displayName: "State",
                            backendName: "state",
                            type: "select",
                            validation: yup.string().required("State is required"),
                            placeholder: "Ex-Maharashtra",
                            helpfulDescription: "Please select the state where your shop is located.",
                            getOptionFromAPI: true,
                            backendURL: "/authentication/option?type=State_Master"
                        },
                        {
                            displayName: "City",
                            backendName: "city",
                            type: "select",
                            validation: yup.string().required("City is required"),
                            placeholder: "Ex-Pune",
                            helpfulDescription: "Please select the city where your shop is located.",
                            getOptionFromAPI: true,
                            backendURL: "/authentication/option?type=City_Master",
                            isDependentOption: true,
                            dependentOptionField: "state"
                        },
                    ]
                },
                {
                    type: "single",
                    fields: [
                        {
                            displayName: "Address",
                            backendName: "address",
                            type: "textarea",
                            validation: yup.string().required("Address is required").min(10, "Address must be at least 10 characters long"),
                            placeholder: "Ex: 123, ABC Street, XYZ Area, Pune, Maharashtra, 411001",
                            helpfulDescription: "Please enter the full address of your shop."
                        }
                    ]
                },
                {
                    type: "double",
                    fields: [
                        {
                            displayName: "Shop Contact Number",
                            backendName: "shopcontactnumber",
                            type: "text",
                            validation: yup.string().required("Shop Contact Number is required").matches(this.phoneNumberRegex, "Shop Contact Number must be a valid 10-digit number"),
                            helpfulDescription: "Please enter the contact phone number of your shop.",
                            placeholder: "Ex: 9876543210"
                        },
                        {
                            displayName: "Shop Email",
                            backendName: "shopemail",
                            type: "email",
                            validation: yup.string().email("Invalid email format").required("Shop Email is required"),
                            helpfulDescription: "Please enter the contact email address of your shop.",
                            placeholder: "Ex: text@gmail.com"
                        }
                    ]
                },
                {
                    type: "double",
                    fields: [
                        {
                            displayName: "Shop Type",
                            backendName: "shoptype",
                            type: "select",
                            options: [{ label: "Owned", value: "owned" }, { label: "leased", value: "leased" }],
                            validation: yup.string().required("Shop Type is required"),
                            helpfulDescription: "Please select the type of your shop.",
                            placeholder: "Select Shop Type"
                        },
                        {
                            displayName: "Lease Owner Name",
                            backendName: "leaseownername",
                            type: "text",
                            validation: yup.string(),
                            helpfulDescription: "Please enter the name of the lease owner if the shop is leased.",
                            placeholder: "Ex: John Doe",
                            isDisabledField: true,
                            isDisabledFieldValueDependsOn: "shoptype",
                            isDisabledFieldValue: "leased"
                        }
                    ]
                },
                {
                    type: "double",
                    fields: [
                        {
                            displayName: "lease Start Date",
                            backendName: "leasestartdate",
                            type: "date",
                            validation: yup.date().nullable().max(new Date(), "Lease Start Date cannot be in the future"),
                            helpfulDescription: "Please select the start date of the lease for your shop.",
                            placeholder: "Ex: 2020-01-01",
                            isDisabledField: true,
                            isDisabledFieldValueDependsOn: "shoptype",
                            isDisabledFieldValue: "leased"
                        },
                        {
                            displayName: "Lease End Date",
                            backendName: "leaseenddate",
                            type: "date",
                            validation: yup.date().nullable(),
                            helpfulDescription: "Please select the end date of the lease for your shop.",
                            placeholder: "Ex: 2025-01-01",
                            isDisabledField: true,
                            isDisabledFieldValueDependsOn: "shoptype",
                            isDisabledFieldValue: "leased"
                        }
                    ]
                }
            ]
        },
        ShopUserDetails: {
            header: "About Your Shop User Details",
            formType: "shopusercards",
            sections: [
                {
                    type: "single",
                    fields: [
                        {
                            displayName: "Shop Name",
                            backendName: "shopname",
                            type: "text",
                            validation: yup.string().required("Shop Name is required").min(3, "Shop Name must be at least 3 characters long").max(50, "Shop Name must be at most 50 characters long").matches(CreateAccountConfig.regax, "Shop Name can only contain letters, spaces, and commas"),
                            helpfulDescription: "Please enter the full name of your shop.",
                            placeholder: "Ex: ABC Electronics",
                            disabled: true
                        }
                    ]
                },
                {
                    type: "double",
                    fields: [
                        {
                            displayName: "State",
                            backendName: "state",
                            type: "select",
                            validation: yup.string().required("State is required"),
                            placeholder: "Ex-Maharashtra",
                            helpfulDescription: "Please select the state where your shop is located.",
                            options: [{ label: "Maharashtra", value: "maharashtra" }, { label: "Karnataka", value: "karnataka" }, { label: "Gujarat", value: "gujarat" }],
                            disabled: true
                        },
                        {
                            displayName: "City",
                            backendName: "city",
                            type: "select",
                            validation: yup.string().required("City is required"),
                            placeholder: "Ex-Pune",
                            helpfulDescription: "Please select the city where your shop is located.",
                            options: [
                                { label: "Pune", value: "pune" },
                                { label: "Mumbai", value: "mumbai" },
                                { label: "Bangalore", value: "bangalore" },
                                { label: "Ahmedabad", value: "ahmedabad" }
                            ],
                            disabled: true
                        },
                    ]
                },
                {
                    type: "single",
                    fields: [
                        {
                            displayName: "Address",
                            backendName: "address",
                            type: "textarea",
                            validation: yup.string().required("Address is required").min(10, "Address must be at least 10 characters long"),
                            placeholder: "Ex: 123, ABC Street, XYZ Area, Pune, Maharashtra, 411001",
                            helpfulDescription: "Please enter the full address of your shop.",
                            disabled: true
                        }
                    ]
                },
                {
                    type: "double",
                    fields: [
                        {
                            displayName: "Shop Contact Number",
                            backendName: "shopcontactnumber",
                            type: "text",
                            validation: yup.string().required("Shop Contact Number is required").matches(this.phoneNumberRegex, "Shop Contact Number must be a valid 10-digit number"),
                            helpfulDescription: "Please enter the contact phone number of your shop.",
                            placeholder: "Ex: 9876543210",
                            disabled: true
                        },
                        {
                            displayName: "Shop Email",
                            backendName: "shopemail",
                            type: "email",
                            validation: yup.string().email("Invalid email format").required("Shop Email is required"),
                            helpfulDescription: "Please enter the contact email address of your shop.",
                            placeholder: "Ex: text@gmail.com",
                            disabled: true
                        }
                    ]
                },
                {
                    type: "double",
                    fields: [
                        {
                            displayName: "Shop Type",
                            backendName: "shoptype",
                            type: "select",
                            options: [{ label: "Owned", value: "owned" }, { label: "leased", value: "leased" }],
                            validation: yup.string().required("Shop Type is required"),
                            helpfulDescription: "Please select the type of your shop.",
                            placeholder: "Select Shop Type",
                            disabled: true
                        },
                        {
                            displayName: "Lease Owner Name",
                            backendName: "leaseownername",
                            type: "text",
                            validation: yup.string().nullable(),
                            helpfulDescription: "Please enter the name of the lease owner if the shop is leased.",
                            placeholder: "Ex: John Doe",
                            isDisabledField: true,
                            isDisabledFieldValueDependsOn: "shoptype",
                            isDisabledFieldValue: "leased",
                            disabled: true
                        }
                    ]
                },
                {
                    type: "double",
                    fields: [
                        {
                            displayName: "lease Start Date",
                            backendName: "leasestartdate",
                            type: "date",
                            validation: yup.date().nullable().transform((_: any, orig) => {
                                if (orig === '' || orig === null) return null;
                                const parsed = new Date(orig);
                                return isNaN(parsed.getTime()) ? null : parsed;
                            }),
                            helpfulDescription: "Please select the start date of the lease for your shop.",
                            placeholder: "Ex: 2020-01-01",
                            isDisabledField: true,
                            isDisabledFieldValueDependsOn: "shoptype",
                            isDisabledFieldValue: "leased",
                            disabled: true
                        },
                        {
                            displayName: "Lease End Date",
                            backendName: "leaseenddate",
                            type: "date",
                            validation: yup.date().nullable().transform((_, orig) => {
                                if (orig === '' || orig === null) return null;
                                const parsed = new Date(orig);
                                return isNaN(parsed.getTime()) ? null : parsed;
                            }),
                            helpfulDescription: "Please select the end date of the lease for your shop.",
                            placeholder: "Ex: 2025-01-01",
                            isDisabledField: true,
                            isDisabledFieldValueDependsOn: "shoptype",
                            isDisabledFieldValue: "leased",
                            disabled: true
                        },
                        {
                            displayName: "User Name",
                            helpfulDescription: "Please provide the username of the person managing the shop.",
                            backendName: "userName",
                            validation: yup.string().required("User Name is required").min(3, "User Name must be atleast 3 characters"),
                            type: "text"
                        },
                        {
                            displayName: "Password",
                            helpfulDescription: "Please provide the password associated with this account. The password must contain at least 8 characters, including digits and special characters.",
                            backendName: "userpassword",
                            validation: yup.string().required("Password is required").min(8, "Password must be atleast 8 characters").matches(this.passwordRegax, "Password must contain at least 8 characters, including digits and special characters."),
                            type: "password"
                        }
                        , {
                            displayName: "Confirm Password",
                            helpfulDescription: "Please provide the password associated with this account. The password must contain at least 8 characters, including digits and special characters.",
                            backendName: "userconfirmpassword",
                            validation: yup.string().required("Confirm Password is required"),
                            type: "password"
                        },
                        {
                            displayName: "User Email",
                            helpfulDescription: "Please provide the user email of the person managing the shop.",
                            backendName: "userEmail",
                            validation: yup.string().email("Invalid email format").required("Contact Email is required"),
                            type: "email"
                        },
                        {
                            displayName: "User Phone Number",
                            helpfulDescription: "Please provide the user email of the person managing the shop.",
                            backendName: "userphonenumber",
                            validation: yup.string().required("User Phone Number is required").matches(this.phoneNumberRegex, "User Phone Number must be a valid 10-digit number"),
                            type: "text"
                        },
                    ]
                }
            ]
        },
        AdminDetails: {
            header: "About Your Admin",
            sections: [
                {
                    type: "double",
                    fields: [
                        {
                            displayName: "Admin User Name",
                            backendName: "adminUserName",
                            validation: yup.string().required("Admin User Name is required"),
                            type: "text"
                        },
                        {
                            displayName : "Admin User Email",
                            backendName : "adminUserEmail",
                            validation: yup.string().email("Invalid email format").required("Contact Email is required"),
                            type: "email"
                        }, {
                            displayName: "Admin Password",
                            backendName: "adminPassword",
                            validation: yup.string().required("Admin User Password is required"),
                            type: "password"
                        }, {
                            displayName: "Admin Confirm Password",
                            backendName: "adminConfirmPassword",
                            validation: yup.string().required("Admin User Confirm Password is required"),
                            type: "password"
                        },
                    ]
                }
            ],
        },
    };
    static readonly organizationDetailsInitialFields: Array<string> = ["organizationId", "OrganizationName", "FounderName", "ContactPhoneNumber", "ContactEmail", "NumberOfShops", "FoundingDate", "OrganizationType", "ProductCategories"];
    static readonly shopDetailsInitialFields: Array<string> = ["shopname", "state", "city", "address", "shopcontactnumber", "shopemail", "shoptype", "leaseownername", "leasestartdate", "leaseenddate"];
    static readonly shopUserDetailsInitialFields: Array<string> = ["shopname", "state", "city", "address", "shopcontactnumber", "shopemail", "shoptype", "leaseownername", "leasestartdate", "leaseenddate", "userName", "password", "confirmpassword", "userphonenumber", "userEmail"];
    static readonly adminUserDetailsInitialFields: Array<string> = ["adminUserName", "adminPassword", "adminConfirmPassword"];
    static readonly successfullCreationMessageTitle : string = "Account creation completed successfully."; 
    static readonly successfullCreationDescriptionText : string = "Sign in now to unlock powerful features like inventory management, sales tracking, shop-to-admin messaging, advanced analytics, and much more. Click below to take the next step and start managing your business with ease.";
}

