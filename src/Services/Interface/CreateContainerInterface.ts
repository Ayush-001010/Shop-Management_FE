export default interface CreateContainerInterface {
    Name: string;
    Height: number;
    Width: number;
    NoOfRows: Array<IContainerRowDetails>;
    Depth: number;
}

export interface IContainerRowDetails {
    RowNumber: number;
    RowHeight: number;
    NoOfColumns: Array<IContainerColumnDetails>;
}

export interface IContainerColumnDetails {
    Width: number;
}