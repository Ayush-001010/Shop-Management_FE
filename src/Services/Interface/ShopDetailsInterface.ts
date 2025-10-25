export interface IContainerDetailsInterface {
    ID: number,
    Name: string,
    Height: number,
    Width: number,
    NoOfRows: number,
    Depth: number,
    rows: Array<{ height: number, cols: Array<number> }>
}

export default interface IShopDetailsInterface {
    shopname: string;
    state: string;
    city: string;
    address: string | null;
    shopcontactnumber: string;
    shopemail: string;
    shoptype: string;
    leaseownername: string | null;
    leasestartdate: string | null;
    leaseenddate: string | null;
    createdAt: string;
    updatedAt: string;
    ID: number;
}