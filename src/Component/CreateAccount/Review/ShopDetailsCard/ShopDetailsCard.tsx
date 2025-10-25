import React from "react";
import type IShopDetailsCard from "./IShopDetailsCard";
import moment from "moment";

const ShopDetailsCard: React.FC<IShopDetailsCard> = ({ data }) => {
    return (
        <div className="bg-white border rounded-lg shadow-md p-4 mb-4">
            <p className="text-xl font-semibold text-center text-gray-800">{data.shopname}</p>
            <hr className="my-2" />
            <div className="flex flex-wrap gap-y-2">
                <div className="w-1/2 text-gray-700 font-medium">State: <span className="text-gray-500">{data.state}</span></div>
                <div className="w-1/2 text-gray-700 font-medium">City: <span className="text-gray-500">{data.city}</span></div>
                <div className="w-1/2 text-gray-700 font-medium">Address: <span className="text-gray-500">{data.address}</span></div>
                <div className="w-1/2 text-gray-700 font-medium">Shop Contact Number: <span className="text-gray-500">{data.shopcontactnumber}</span></div>
                <div className="w-1/2 text-gray-700 font-medium">Email: <span className="text-gray-500">{data.shopemail}</span></div>
                <div className="w-1/2 text-gray-700 font-medium">Shop Type: <span className="text-gray-500">{data.shoptype}</span></div>
                <div className="w-1/2 text-gray-700 font-medium">Lease Owner Name: <span className="text-gray-500">{data.leaseownername}</span></div>
                <div className="w-1/2 text-gray-700 font-medium">Lease Start Date: <span className="text-gray-500">{data.leasestartdate ? moment(data.leasestartdate).format("DD/MM/YYYY") : ""}</span></div>
                <div className="w-1/2 text-gray-700 font-medium">Lease End Date: <span className="text-gray-500">{data.leaseenddate ? moment(data.leaseenddate).format("DD/MM/YYYY") : ""}</span></div>
                <div className="w-1/2 text-gray-700 font-medium">Shop User Name: <span className="text-gray-500">{data.userName}</span></div>
                <div className="w-1/2 text-gray-700 font-medium">Shop User Email: <span className="text-gray-500">{data.userEmail}</span></div>
                <div className="w-1/2 text-gray-700 font-medium">Shop User Password: <span className="text-gray-500">{data.userpassword}</span></div>
                <div className="w-1/2 text-gray-700 font-medium">Shop User Confirm Password: <span className="text-gray-500">{data.userconfirmpassword}</span></div>
                <div className="w-1/2 text-gray-700 font-medium">Shop User Contact Number: <span className="text-gray-500">{data.userphonenumber}</span></div>
            </div>
        </div>
    );
};

export default ShopDetailsCard;
