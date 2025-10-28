import type ITableInterface from "../Interface/DashboardInterface";
import type { IDashboardCardInterface, ITableFilterInterface, ITablePropertiesInterface } from "../Interface/DashboardInterface";

export default class ShopInventoryConfig {
    static readonly cardConfig: Array<IDashboardCardInterface> = [
        {
            title: "Number of Products Available",
            backendURL: "/shopInventory/cardValues?type=TotalNumberOfProduct",
            type: "count"
        },
        {
            title: "Total Low Stock Products",
            backendURL: "/shopInventory/cardValues?type=LowStockCount",
            type: "count"
        },
        {
            title: "Free Inventory Space (in %)",
            backendURL: "/shopInventory/cardValues?type=AvaliableSpacePercentage",
            type: "percentage"
        },
        {
            title: "Number of Containers",
            backendURL: "/shopInventory/cardValues?type=TotalNumberOfContainer",
            type: "count"
        },
        {
            title: "7-Day Profitability Status",
            backendURL: "/shopInventory/cardValues?type=ShopStatus",
            type: "profit&loss"
        },
        {
            title: "Inventory Investment Total",
            backendURL: "/shopInventory/cardValues?type=CostToBuyProduct",
            type: "count"
        },
        {
            title: "Projected Inventory Profit",
            backendURL: "/shopInventory/cardValues?type=ExpectedProfit",
            type: "count"
        },
        {
            title: "Total Expired Products",
            backendURL: "/shopInventory/cardValues?type=NumberOfItemExpired",
            type: "count"
        }
    ];
    static readonly tableColumnConfig: Array<ITableInterface> = [
        {
            displayName: "ID",
            backendName: "ID",
        },
        {
            displayName: "Product Name",
            backendName: "ProductName",
        },
        {
            displayName: "Category Type",
            backendName: "CategoryType"
        },
        {
            displayName: "Sub Category Type",
            backendName: "SubCategoryType",
            isHideField: true
        },
        {
            displayName: "Quantity",
            backendName: "Quantity",
        },
        {
            displayName: "Purchase Price",
            backendName: "CostToBuy",
            isHideField: true
        },
        {
            displayName: "Per Item Profit",
            backendName: "PerItemProfit",
            isHideField: true
        },
        {
            displayName: "Container Name",
            backendName: "ContainerName"
        },
        {
            displayName: "Row Number",
            backendName: "RowNumber",
            isHideField: true
        },
        {
            displayName: "Column Number",
            backendName: "ColumnNumber",
            isHideField: true
        },
        {
            displayName: "Minimum Stock Level",
            backendName: "LowStock",
            isHideField: true
        },
        {
            displayName: "Expired Date",
            backendName: "ExpiredDate",
            isDateField: true
        },
        {
            displayName: "Product Add Date",
            backendName: "createdAt",
            isHideField: true,
            isDateField: true
        },
    ];
    static readonly tableProperties: Array<ITablePropertiesInterface> = [
        { displayName: "ID", backendName: "ID" },
        { displayName: "Product Name", backendName: "ProductName" },
        { displayName: "Category Type", backendName: "CategoryType" },
        { displayName: "Sub Category Type", backendName: "SubCategoryType" },
        { displayName: "Quantity", backendName: "Quantity" },
        { displayName: "Purchase Price", backendName: "CostToBuy", value: false },
        { displayName: "Per Item Profit", backendName: "PerItemProfit", value: false },
        { displayName: "Container Name", backendName: "ContainerName" },
        { displayName: "Row Number", backendName: "RowNumber", value: false },
        { displayName: "Column Number", backendName: "ColumnNumber", value: false },
        { displayName: "Minimum Stock Level", backendName: "LowStock", value: false },
        { displayName: "Expired Date", backendName: "ExpiredDate" },
        { displayName: "Product Add Date", backendName: "createdAt", value: false }
    ];
    static readonly tableFilters: Array<ITableFilterInterface> = [
        {
            displayName: "Category",
            backendName: "CategoryType",
            backendURL: "/shopInventory/getOption?type=Category"
        },
        {
            displayName: "Sub Category",
            backendName: "SubCategoryType",
            backendURL: "/shopInventory/getOption?type=SubCategory",
            isDependent: true,
            dependentFieldName: "CategoryType"
        },
        {
            displayName: "Container Name",
            backendName: "ContainerName",
            backendURL: "/shopInventory/getOption?type=ContainerName"
        },
        {
            displayName: "Product Name",
            backendName: "ProductName",
            backendURL: "/shopInventory/getOption?type=ProductName"
        }
    ]
}