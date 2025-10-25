import dayjs from "dayjs";
import type { IOptionsInterface } from "../Interface/CommonInterface";
import type ITableInterface from "../Interface/DashboardInterface";
import type { IBoardFilterInterface, IBoardHeaderInterFace, ITableFilterInterface, ITablePropertiesInterface } from "../Interface/DashboardInterface";
import type IFormFieldsInterface from "../Interface/FormFieldsInterface";
import * as yup from "yup";

const today = dayjs();
export default class InventoryConfig {
  static readonly title = "Upcoming Inventory Requests";
  static readonly option: Array<IOptionsInterface> = [{ label: "7", value: 7 }];
  static readonly tableConfig: Array<ITableInterface> = [
    {
      displayName: "Product Name",
      backendName: "ProductName",
      icon: "bi bi-box"
    },
    {
      displayName: "Product Type",
      backendName: "ProductType",
      icon: "bi bi-boxes"
    },
    {
      displayName: "Product Description",
      backendName: "ProductDescription",
      icon: "bi bi-pen",
      isBigTextColumn: true
      // isHideField:true
    },
    {
      displayName: "Quantity",
      backendName: "Quantity",
      icon: "bi bi-bag",
      isHideField: true
    },
    {
      displayName: "Cost",
      backendName: "Cost",
      icon: "bi bi-currency-rupee",
      isHideField: true
    },
    {
      displayName: "Expected Reached Date",
      backendName: "ExpectedReachedDate",
      icon: "bi bi-calendar2-date",
      isDateField: true
    },
    {
      displayName: "Actual Reached Date",
      backendName: "ActualReachedDate",
      icon: "bi bi-calendar2-date",
      isDateField: true,
      isHideField: true
    },
    {
      displayName: "Client Name",
      backendName: "ClientName",
      icon: "bi bi-person-circle",
      isHideField: true
    },
    {
      displayName: "Client Contact Number",
      backendName: "ClientPhone",
      icon: "bi bi-telephone",
      isHideField: true
    },
    {
      displayName: "Request Date",
      backendName: "RequestDate",
      icon: "bi bi-calendar2-date",
      isDateField: true,
      isHideField: true
    },
    {
      displayName: "Order Date",
      backendName: "OrderDate",
      icon: "bi bi-calendar2-date",
      isDateField: true,
      isHideField: true
    },
    {
      displayName: "Request By",
      backendName: "RequestBy",
      icon: "bi bi-person-circle"
    },
    {
      displayName: "Current Status",
      backendName: "Status",
      icon: "bi bi-question-circle",
      isFormatter: true,
      formatterFuncName: "inventoryStatusFunc"
    },
    {
      displayName: "Addtional Note",
      backendName: "AddtionalNote",
      icon: "bi bi-pen",
      isBigTextColumn: true,
      isHideField:true
    },
    {
      displayName: "Action",
      backendName: "Action",
      isNotRequiredOnBoard: true,
      isFormatter: true,
      formatterFuncName: "inventoryAction"
    }
  ];
  static readonly tablePropertiesArr: Array<ITablePropertiesInterface> = [
    {
      displayName: "Product Name",
      backendName: "ProductName"
    },
    {
      displayName: "Product Type",
      backendName: "ProductType"
    },
    {
      displayName: "Product Description",
      backendName: "ProductDescription"
    },
    {
      displayName: "Quantity",
      backendName: "Quantity"
    },
    {
      displayName: "Cost",
      backendName: "Cost"
    },
    {
      displayName: "current Status",
      backendName: "currentStatus"
    },
    {
      displayName: "Expected Reached Date",
      backendName: "ExpectedReachedDate"
    },
    {
      displayName: "Actual Reached Date",
      backendName: "ActualReachedDate"
    },
    {
      displayName: "Client Name",
      backendName: "ClientName"
    },
    {
      displayName: "Client Phone",
      backendName: "ClientPhone"
    },
    {
      displayName: "Request Date",
      backendName: "RequestDate"
    },
    {
      displayName: "Order Date",
      backendName: "OrderDate"
    },
    {
      displayName: "Request By",
      backendName: "RequestBy"
    },
    {
      displayName: "Addtional Note",
      backendName: "AddtionalNote"
    },
  ];
  static readonly boardHeaderArrayConfig: Array<IBoardHeaderInterFace> = [
    {
      title: "New",
      color: "black",
      value: true
    },
    {
      title: "In-Progress",
      color: "yellow",
      value: true
    },
    {
      title: "Hold",
      color: "orange",
      value: true
    },
    {
      title: "Complete",
      color: "green",
      value: true
    },
    {
      title: "Rejected",
      color: "red",
      value: true
    }
  ];
  static readonly openFormButtonText: string = "New Inventory Request";
  static readonly newInventoryFormConfig: IFormFieldsInterface = {
    header: "",
    sections: [
      {
        type: "double",
        fields: [
          {
            displayName: "Product Type",
            backendName: "ProductType",
            type: "select",
            getOptionFromAPI: true,
            backendURL: "/master/productType",
            validation: yup.string().required("Product Type is required")
          },
          {
            displayName: "Product Name",
            backendName: "ProductName",
            type: "text",
            validation: yup.string().required("Product Type is required")
          },
          {
            displayName: "Quantity",
            backendName: "Quantity",
            type: "text",
            validation: yup.number().required("Product Type is required").min(1, "Quantity cannot be less than 1"),
            textFieldType: "number"
          },
          {
            displayName: "Product Description",
            backendName: "ProductDescription",
            type: "textarea",
            validation: yup.string().required("Product Description is required").min(10, "Product Description should be at least 10 characters long")
          },
          {
            displayName: "Request By",
            backendName: "RequestBy",
            type: "email",
            disabled: true,
            validation: yup.string().required("Product Type is required")
          },
          {
            displayName: "Request Date",
            backendName: "RequestDate",
            type: "date",
            disabled: true,
            validation: yup.string().required("Product Type is required")
          }
        ]
      }
    ]
  };
  static readonly newOrderPlaceFormConfig: IFormFieldsInterface = {
    header: "",
    sections: [
      {
        type: "double",
        fields: [
          {
            displayName: "Product Type",
            backendName: "ProductType",
            type: "select",
            getOptionFromAPI: true,
            disabled: true,
            backendURL: "/master/productType",
            validation: yup.string().required("Product Type is required"),
          },
          {
            displayName: "Product Name",
            backendName: "ProductName",
            type: "text",
            disabled: true,
            validation: yup.string().required("Product Type is required")
          },
          {
            displayName: "Quantity",
            backendName: "Quantity",
            type: "text",
            disabled: true,
            validation: yup.number().required("Product Type is required").min(1, "Quantity cannot be less than 1"),
            textFieldType: "number"
          },
          {
            displayName: "Product Description",
            backendName: "ProductDescription",
            type: "textarea",
            disabled: true,
            validation: yup.string().required("Product Description is required").min(10, "Product Description should be at least 10 characters long")
          },
          {
            displayName: "Request By",
            backendName: "RequestBy",
            type: "email",
            disabled: true,
            validation: yup.string().required("Product Type is required")
          },
          {
            displayName: "Request Date",
            backendName: "RequestDate",
            type: "date",
            disabled: true,
            validation: yup.string().required("Product Type is required")
          },
          {
            displayName: "Cost",
            backendName: "Cost",
            type: "text",
            textFieldType: "number",
            validation: yup.number().required("Cost is required").min(0, "Cost cannot be less than 0")
          },
          {
            displayName: "Client Name",
            backendName: "ClientName",
            type: "text",
            validation: yup.string().required("Client Name is required")
          },
          {
            displayName: "Client Contact Number",
            backendName: "ClientPhone",
            type: "text",
            validation: yup.string().required("Client Contact Number is required").matches(/^[0-9]{10}$/, 'Client Contact Number must be exactly 10 digits')
          },
          {
            displayName: "Client Company",
            backendName: "ClientCompany",
            type: "text",
            validation: yup.string().required("Client Company is required")
          },
          {
            displayName: "Expected Reached Date",
            backendName: "ExpectedReachedDate",
            type: "date",
            validation: yup.string().required("Expected Reached Date is required"),
            minDate: today
          },
          {
            displayName: "Order Date",
            backendName: "OrderDate",
            type: "date",
            validation: yup.string().required("Order Date is required"),
            maxDate: today
          },
          {
            displayName: "Additional Note",
            backendName: "AddtionalNote",
            type: "textarea",
            validation: yup.string().notRequired()
          }
        ]
      }
    ]
  };
  static readonly holdInventoryRequestFormConfig: IFormFieldsInterface = {
    header: "",
    sections: [
      {
        type: "double",
        fields: [
          {
            displayName: "Product Type",
            backendName: "ProductType",
            type: "select",
            getOptionFromAPI: true,
            disabled: true,
            backendURL: "/master/productType",
            validation: yup.string().required("Product Type is required"),
          },
          {
            displayName: "Product Name",
            backendName: "ProductName",
            type: "text",
            disabled: true,
            validation: yup.string().required("Product Type is required")
          },
          {
            displayName: "Quantity",
            backendName: "Quantity",
            type: "text",
            disabled: true,
            validation: yup.number().required("Product Type is required").min(1, "Quantity cannot be less than 1"),
            textFieldType: "number"
          },
          {
            displayName: "Product Description",
            backendName: "ProductDescription",
            type: "textarea",
            disabled: true,
            validation: yup.string().required("Product Description is required").min(10, "Product Description should be at least 10 characters long")
          },
          {
            displayName: "Request By",
            backendName: "RequestBy",
            type: "email",
            disabled: true,
            validation: yup.string().required("Product Type is required")
          },
          {
            displayName: "Request Date",
            backendName: "RequestDate",
            type: "date",
            disabled: true,
            validation: yup.string().required("Product Type is required")
          },
          {
            displayName: "Hold Reason",
            backendName: "HoldReason",
            type: "textarea",
            validation: yup.string().required("Hold Reason is required").min(10, "Hold Reason should be at least 10 characters long")
          }
        ]
      }
    ]
  };
  static readonly rejectInventoryRequestFormConfig: IFormFieldsInterface = {
    header: "",
    sections: [
      {
        type: "double",
        fields: [
          {
            displayName: "Product Type",
            backendName: "ProductType",
            type: "select",
            getOptionFromAPI: true,
            disabled: true,
            backendURL: "/master/productType",
            validation: yup.string().required("Product Type is required"),
          },
          {
            displayName: "Product Name",
            backendName: "ProductName",
            type: "text",
            disabled: true,
            validation: yup.string().required("Product Type is required")
          },
          {
            displayName: "Quantity",
            backendName: "Quantity",
            type: "text",
            disabled: true,
            validation: yup.number().required("Product Type is required").min(1, "Quantity cannot be less than 1"),
            textFieldType: "number"
          },
          {
            displayName: "Product Description",
            backendName: "ProductDescription",
            type: "textarea",
            disabled: true,
            validation: yup.string().required("Product Description is required").min(10, "Product Description should be at least 10 characters long")
          },
          {
            displayName: "Request By",
            backendName: "RequestBy",
            type: "email",
            disabled: true,
            validation: yup.string().required("Product Type is required")
          },
          {
            displayName: "Request Date",
            backendName: "RequestDate",
            type: "date",
            disabled: true,
            validation: yup.string().required("Product Type is required")
          },
          {
            displayName: "Reject Reason",
            backendName: "RejectedReason",
            type: "textarea",
            validation: yup.string().required("Hold Reason is required").min(10, "Hold Reason should be at least 10 characters long")
          }
        ]
      }
    ]
  };
  static readonly newInventoryFormTitle: string = "Create New Inventory Request";
  static readonly boardFilterConfig: Array<IBoardFilterInterface> = [
    {
      displayName: "Product Name",
      backendName: "ProductName",
      backendURL: "/inventory/option?type=ProductName"
    },
    {
      displayName: "Product Type",
      backendName: "ProductType",
      backendURL: "/inventory/option?type=ProductType"
    },
    {
      displayName: "Client Company",
      backendName: "ClientCompany",
      backendURL: "/inventory/option?type=ClientCompany"
    },
    {
      displayName: "Request Date",
      backendName: "RequestDate",
      backendURL: "/inventory/option?type=RequestDate"
    }
  ];
  static readonly tableFilterConfig: Array<ITableFilterInterface> = [
    {
      displayName: "Product Type",
      backendName: "ProductType",
      backendURL: "/inventory/option?type=ProductType"
    },
    {
      displayName: "Client Company",
      backendName: "ClientCompany",
      backendURL: "/inventory/option?type=ClientCompany"
    },
    {
      displayName: "Status",
      backendName: "currentStatus",
      option: [
        {
          label: "New",
          value: "New"
        },
        {
          label: "In-Progress",
          value: "In-Progress"
        },
        {
          label: "Hold",
          value: "Hold"
        },
        {
          label: "Complete",
          value: "Complete"
        },
        {
          label: "Rejected",
          value: "Rejected"
        }
      ]
    },
    {
      displayName: "Request By",
      backendName: "RequestBy",
      backendURL: "/inventory/option?type=RequestBy"
    }
  ];
  static readonly activitiesOption: Array<IOptionsInterface> = [
    {
      label: "New",
      value: "New"
    },
    {
      label: "Order Placed",
      value: "Order Placed"
    },
    {
      label: "Completed",
      value: "Completed"
    },
    {
      label: "Hold",
      value: "Hold"
    },
    {
      label: "Rejected",
      value: "Rejected"
    }
  ]
}