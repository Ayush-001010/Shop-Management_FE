export interface ICollapseItemInterface {
    key: number | string;
    label: any;
    children: any;
}

export interface IRowDetailsValueInterface {
    height: number;
    noOfCols: number;
    colsWidth: Array<number>;
}

export default interface IAddContainerInterface {
    height: number;
    width: number;
    noOfRows: number;
    depth:number;
}