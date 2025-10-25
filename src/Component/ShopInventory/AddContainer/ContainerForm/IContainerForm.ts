import type IAddContainerInterface from "../../../../Services/Interface/ContainerInterface";

export default interface IContainerForm {
    setRowHeightFunc: (index: number, newHeight: number) => void;
    defineNumberOfRows: (newRowValue: number) => void;
    value: IAddContainerInterface;
    changeHandler: (newValue: number, backendName: keyof IAddContainerInterface) => void;
    defineNumberOfColumnsInPerticularRow: (newNumberColumns: number , index : number) => void;
    setColumnWidthInPerticularRow: (index: number, colIndex: number, newColumnWidth: number) => void;
}