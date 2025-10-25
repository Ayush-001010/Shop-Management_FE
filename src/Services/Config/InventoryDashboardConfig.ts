import type { IAnalyticsOptionInterface } from "../Interface/AnalyticsInterface";
import type { ITableFilterInterface, ITablePropertiesInterface } from "../Interface/DashboardInterface";
import type ITableInterface from "../Interface/DashboardInterface";

export default class InventoryDashboardConfig {
    static readonly analyticsOption: Array<IAnalyticsOptionInterface> = [{
        title: "Inventory Request",
        type: "line"
    }, {
        title: "Amount Purcase",
        type: "line"
    }, {
        title: "Total Sales",
        type: "line"
    }, {
        title: "Profit",
        type: "bar"
    }, {
        title: "Loss",
        type: "bar"
    }];
    static readonly cardOptions: Array<string> = ["Number Of Profit Making Shops", "Number Of Loss Making Shops"];
    static readonly columnConfig: Array<ITableInterface> = [
        {
            displayName: "Shop Name",
            backendName: "shopname"
        },
        {
            displayName: "City",
            backendName: "city"
        },
        {
            displayName: "State",
            backendName: "state"
        },
        {
            displayName: "Address",
            backendName: "address",
            isBigTextColumn: true
        },
        {
            displayName: "Shop Contact Number",
            backendName: "shopcontactnumber"
        },
        {
            displayName: "Shop Type",
            backendName: "shoptype"
        },
        {
            displayName: "Lease Owner Name",
            backendName: "leaseownername",
            isHideField: true
        },
        {
            displayName: "Lease Start Date",
            backendName: "leasestartdate",
            isHideField: true
        },
        {
            displayName: "Lease End Date",
            backendName: "leaseenddate",
            isHideField: true
        },
        {
            displayName:"Vist to Shop Details",
            backendName:"",
            isFormatter:true,
            formatterFuncName:"redirectToShopDetails"
        }
    ];
    static readonly properties: Array<ITablePropertiesInterface> = [
        { displayName: "Shop Name", backendName: "shopname", value: true },
        { displayName: "City", backendName: "city", value: true },
        { displayName: "State", backendName: "state", value: true },
        { displayName: "Address", backendName: "address", value: true },
        { displayName: "Shop Contact Number", backendName: "shopcontactnumber", value: true },
        { displayName: "Shop Type", backendName: "shoptype", value: true },
        { displayName: "Lease Owner Name", backendName: "leaseownername" },
        { displayName: "Lease Start Date", backendName: "leasestartdate" },
        { displayName: "Lease End Date", backendName: "leaseenddate" }
    ];
    static readonly filterConfig : Array<ITableFilterInterface> = [
        {
            displayName : "Shop Name",
            backendName : "shopname",
            backendURL: "/inventory/options?type=shopname"
        },
        {
            displayName : "Shop Type",
            backendName : "shoptype",
            backendURL : "/inventory/options?type=shoptype"
        }
    ]
}