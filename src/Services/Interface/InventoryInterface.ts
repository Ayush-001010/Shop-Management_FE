export default interface InventoryInterface {
    ID: number;
    ProductName: string;
    ProductType: string;
    Quantity: number,
    Cost: number,
    ExpectedReachedDate: string,
    ActualReachedDate: string,
    ClientName: string;
    ClientPhone: string;
    ClientCompany: string;
    RequestDate: string,
    OrderDate: string,
    RequestBy: string;
    currentStatus : "New Request" | "Rejected" | "Ordered Placed" | "Shipping" | "Reached"
}