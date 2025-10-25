import type ITableInterface from "../../../../../../Services/Interface/DashboardInterface";

export default interface IInventoryCard {
    item: any;
    tableConfig: Array<ITableInterface>;
    header: string;
    id:number
}