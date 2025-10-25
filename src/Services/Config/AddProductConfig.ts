import type IFormFieldsInterface from "../Interface/FormFieldsInterface";
import * as yup from "yup";

export default class AddProductConfig {
    static readonly productDetailsFormConfig: IFormFieldsInterface = {
        header: "Product Details",
        sections: [
            {
                type: "double",
                fields: [
                    {
                        displayName: "Product Name",
                        backendName: "ProductName",
                        type: "text",
                        validation: yup.string().required("Product Name is required"),
                    },
                    {
                        displayName: "Product Type",
                        backendName: "ProductType",
                        type: "select",
                        getOptionFromAPI: true,
                        backendURL: "/master/productType",
                        validation: yup.string().required("Product Type is required"),
                    },
                    {
                        displayName: "Quantity",
                        backendName: "Quantity",
                        type: "number",
                        validation: yup
                            .number()
                            .required("Quantity is required")
                            .min(1, "Quantity must be at least 1"),
                    },
                    {
                        displayName: "Cost to Buy",
                        backendName: "Cost",
                        type: "number",
                        validation: yup
                            .number()
                            .required("Cost is required")
                            .min(0, "Cost cannot be negative"),
                    },
                    {
                        displayName: "Per Item Profit",
                        backendName: "PerItemProfit",
                        type: "number",
                        validation: yup
                            .number()
                            .required("Profit is required")
                            .min(0, "Profit cannot be negative"),
                    },
                    {
                        displayName: "Product Height (In Centimeter)",
                        backendName: "Height",
                        type: "number",
                        validation: yup
                            .number()
                            .required("Height is required")
                            .min(1, "Height must be greater than zero"),
                    },
                    {
                        displayName: "Product Width (In Centimeter)",
                        backendName: "Width",
                        type: "number",
                        validation: yup
                            .number()
                            .required("Width is required")
                            .min(1, "Width must be greater than zero"),
                    },
                    {
                        displayName: "Expired Date",
                        backendName: "ExpiredDate",
                        type: "date",
                        validation: yup.date().nullable()
                    },
                    {
                        displayName: "Low Stock Max Limit",
                        backendName: "LowStock",
                        type: "number",
                        validation: yup.number().nullable()
                    }
                ],
            },
        ],
    };
    static readonly productPlacementForConfig: IFormFieldsInterface = {
        header: "",
        formType: "productPlacement",
        sections: [
            {
                type: "single",
                fields: [
                    {
                        displayName: "Custom",
                        backendName: "IsCustom",
                        type: "radio",
                        validation: yup.boolean().required("Required")
                    }
                ]
            },
            {
                type: "double",
                fields: [
                    {
                        displayName: "Container Name",
                        backendName: "ContainerName",
                        type: "select",
                        validation: yup.string().required("Required"),
                        getOptionFromAPI: true,
                        backendURL: "/shopInventory/getoption"
                    },
                    {
                        displayName: "Row Number",
                        backendName: "RowNumber",
                        type: "select",
                        validation: yup.string().required("Required"),
                        dependentOptionField: "ContainerName",
                        backendURL: "/shopInventory/getoption",
                        getOptionFromAPI: true,
                        isDependentOption: true
                    },
                    {
                        displayName: "Column Number",
                        backendName: "ColumnNumber",
                        type: "select",
                        validation: yup.string().required("Required"),
                        dependentOptionField: "RowNumber",
                        backendURL: "/shopInventory/getoption",
                        getOptionFromAPI: true,
                        isDependentOption: true
                    }
                ]
            }
        ]
    };
}