export default interface IAddProductInterface {
    ProductName: string;
    CategoryType: string;
    Quantity: number;
    Cost: number;
    PerItemProfit: number;
    Height: number;
    Width: number;
    ExpiredDate: Date | null;
    position: Array<{ RowNumber: number, ColumnNumber: number, RowIndex: number, ColumnIndex: number, ContainerName: string, ContainerID: number }> | undefined;
    LowStock: number | null;
    ProductPositioningInfo: string | null;
    ProductImages: Array<File>;
    ProductDescription: string | null;
    Depth: string | null,
    SubCategoryType: string | null
}