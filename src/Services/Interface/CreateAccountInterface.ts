export interface IShopDetails {
    shopname: string;
    state: string;
    city: string;
    address: string;
    shopcontactnumber: string;
    shopemail: string;
    shoptype: string;
    leaseownername: string | null;
    leasestartdate: Date | null;
    leaseenddate: Date | null;
    userName: string;
    userpassword: string;
    userconfirmpassword: string;
    userEmail: string;
    userphonenumber: string;
}

export interface IAdminDetails {
    adminUserName: string;
    adminPassword: string;
    adminConfirmPassword: string;
    adminUserEmail : string;
}

export default interface ICreateAccountInterface {
    organizationId: string;
    OrganizationName: string;
    FounderName: string;
    ContactPhoneNumber: string;
    ContactEmail: string;
    NumberOfShops: string;
    FoundingDate: Date | null;
    OrganizationType: string;
    ProductCategories: Array<string> | null | undefined;
    shopDetails: Array<IShopDetails> | null | undefined;
    adminDetails : IAdminDetails
}