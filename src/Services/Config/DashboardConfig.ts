export default class DashboardConfig {
    static readonly dateCols: Array<string> = ["ExpectedReachedDate", "ActualReachedDate", "RequestDate", "createdAt", "ExpiredDate"];
    static readonly bigTextCols: Array<string> = ["ProductDescription" , "address"];
    static readonly hideCols: Array<string> = ["redirectToShopDetails"];
}
