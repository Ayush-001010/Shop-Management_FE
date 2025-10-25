import type ITableInterface from "../../../../../Services/Interface/DashboardInterface";

export default interface IBoardContent {
    data: Array<Array<Record<string, any>>>;
    boardCardType?: "Inventory";
    tableConfig: Array<ITableInterface>;
}