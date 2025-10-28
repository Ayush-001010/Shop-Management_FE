import APICallingServices from "../APICallingService";
import CreateAccountConfig from "../Config/CreateAccountConfig";
import type { IAdminDetails, IShopDetails } from "../Interface/CreateAccountInterface";
import type ICreateAccountInterface from "../Interface/CreateAccountInterface";

const useCreateAccount = () => {

    const genratedFormInitialValues = (value: ICreateAccountInterface, type: "OrganizationDetails" | "ShopDetails" | "ShopUserDetails" | "AdminDetails", noOfShops?: number) => {
        const initialValues: Record<string, any> = {};
        switch (type) {
            case "OrganizationDetails": {
                const fields = CreateAccountConfig.organizationDetailsInitialFields;
                fields.forEach((field) => {
                    initialValues[field] = value[field as keyof ICreateAccountInterface] || "";
                });
                return initialValues;
            }
            case "ShopDetails": {
                const fields = CreateAccountConfig.shopDetailsInitialFields;
                if (!noOfShops) noOfShops = 1;
                for (let i = 0; i < noOfShops; i++) {
                    fields.forEach((field) => {
                        initialValues[`${field}_${i + 1}`] = value?.shopDetails && value.shopDetails.length > i ? value.shopDetails[i][field as keyof IShopDetails] : "";
                    });
                }
                return initialValues;
            }
            case "ShopUserDetails": {
                const fields = CreateAccountConfig.shopUserDetailsInitialFields;
                if (!noOfShops) noOfShops = 1;
                for (let i = 0; i < noOfShops; i++) {
                    fields.forEach((field) => {
                        initialValues[`${field}_${i + 1}`] = value.shopDetails ? value.shopDetails[i][field as keyof IShopDetails] : null;
                    });
                }
                return initialValues;
            }
            case "AdminDetails": {
                const fields = CreateAccountConfig.adminUserDetailsInitialFields;
                for (const key of fields) {
                    initialValues[key] = value.adminDetails[key as keyof IAdminDetails] || null;
                }
                return initialValues;
            }
        }
    }
    const genratedInitialValues = () => {
        const initialValues: ICreateAccountInterface = {
            organizationId: "",
            OrganizationName: "",
            FounderName: "",
            ContactPhoneNumber: "",
            ContactEmail: "",
            NumberOfShops: "",
            FoundingDate: null,
            OrganizationType: "",
            ProductCategories: undefined,
            shopDetails: [],
            adminDetails: {
                adminConfirmPassword: "",
                adminPassword: "",
                adminUserName: "",
                adminUserEmail: ""
            }
        };
        return initialValues;
    }
    const createNewAccount = (value: ICreateAccountInterface) => {
        const apiObj = new APICallingServices();
        return apiObj.getDataFromBackend("/authentication/createAccount", value);
    }

    return { genratedInitialValues, genratedFormInitialValues, createNewAccount };
}

export default useCreateAccount;