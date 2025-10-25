import type { IContainerDetailsInterface } from "../../../../../Services/Interface/ShopDetailsInterface";

export default interface IContainerView {
    data : IContainerDetailsInterface;
    changeTheStepHandler : (val : Array<{ RowNumber: number, ColumnNumber: number, RowIndex: number, ColumnIndex: number }>) => void;
}