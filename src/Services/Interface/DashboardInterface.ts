import type { IOptionsInterface, IStepInterface } from "./CommonInterface";

export interface IBoardHeaderInterFace {
    title: string;
    color: "black" | "green" | "yellow" | "red" | "orange";
    value: boolean;
}

export interface ITablePropertiesInterface {
    displayName: string;
    backendName: string;
    value?: boolean;
}

export interface IBoardFilterInterface {
    displayName: string;
    backendName: string;
    option?: Array<IOptionsInterface>;
    backendURL?: string;
}

export interface ITableFilterInterface {
    displayName: string;
    backendName: string;
    option?: Array<IOptionsInterface>;
    backendURL?: string;
}

export interface ITableConfigInterface {
    dataIndex: string;
    key: string;
    title: string;
    render?: any;
}

export interface IBigTextModalInterface {
    open: boolean;
    text: string;
    propertyName: string;
}

export interface IStatusStepsModalInterface {
    open: boolean;
    items: Array<IStepInterface>;
    val: number
}

export interface IClearButtonAppliedInterface {
    type: "All" | "New" | "In-Progress" | "Hold" | "Completed" | "Rejected" | ""
}

export interface IDashboardCardInterface {
    title: string;
    backendURL: string;
    type: "count" | "profit&loss" | "percentage";
}

export default interface ITableInterface {
    displayName: string;
    backendName: string;
    icon?: string;
    isDateField?: boolean;
    isHideField?: boolean;
    isFormatter?: boolean;
    formatterFuncName?: string;
    isNotRequiredOnBoard?: boolean;
    isBigTextColumn?: boolean;
}