export interface ICategoryItemInterface {
    Category: string;
    ImageURL: string;
}

export interface IItemInterface {
    ID: number;
    ProductName: string;
    CategoryType: string;
    SubCategoryType: string;
    Quantity: number;
    CostToBuy: number;
    PerItemProfit: number;
    ContainerName: string;
    RowNumber: number;
    ColumnNumber: number;
    Height: number;
    Width: number;
    Depth: number;
    LowStock: number;
    ExpiredDate: Date;
    ProductImagesURL?: Array<string> | null;
    ProductDescription: string;
    ProductPositionInfo: string;
    createdAt?: Date;
    updatedAt?: Date;
}
