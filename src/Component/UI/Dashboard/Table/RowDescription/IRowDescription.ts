import type { ITableConfigInterface } from "../../../../../Services/Interface/DashboardInterface";

export default interface IRowDescription {
    data:Record<string,any>;
    config : Array<ITableConfigInterface>;
}