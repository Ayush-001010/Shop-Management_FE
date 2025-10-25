export default interface IAddProductInterface {
    ProductName: string;
    ProductType: string;
    Quantity: number;
    Cost: number;
    PerItemProfit: number;
    Height: number;
    Width: number;
    ExpiredDate: Date | null;
    position: Array<{ RowNumber: number, ColumnNumber: number, RowIndex: number, ColumnIndex: number }> | undefined;
    LowStock: number | null;
}