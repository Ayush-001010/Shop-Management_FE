export default interface IProductPlacementForm{
    changeTheStepHandler : (val : Array<{ RowNumber: number, ColumnNumber: number, RowIndex: number, ColumnIndex: number }>) => void;
}