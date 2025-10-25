export interface IProductDetailsInterface {
    ColumnNumber: number;
    ContainerName: string;
    HeightE: number;
    HeightS: number;
    ProductName: string;
    ProductType: string;
    RowNumber: number;
    WidthE: number;
    WidthS: number;
}

export interface ISerachProductPlaceDetailsInterface {
    HeightEndPoint: number;
    HeightStartPoint: number;
    RowNumber: number;
    WidthEndPont: number;
    WidthStartPont: number;
    columnNumber: number;
    containerProduct: Array<IProductDetailsInterface>;
}

export interface IContainerColumnDetailsInterface {
    ColumnNumber: number;
    Width: number;
}

export interface IContainerRowDetailsInterface {
    RowNumber: number;
    RowHeight: number;
    NoOfColumns: number;
    columns: Array<IContainerColumnDetailsInterface>
}

export default interface IContainerDetailsInterface {
    Height: number;
    Name: string;
    NoOfRows: number;
    Width: number;
    RowDetails: Array<IContainerRowDetailsInterface>
}