import React from "react";
import type IHeader from "./IHeader";
import { useSelector } from "react-redux";

const Header: React.FC<IHeader> = () => {
    const { user } = useSelector((state: any) => state);
    return (
        <div className="m-1">
            <p className="font-semibold text-2xl text-shadow-sm">{user.orgnizationDetails?.orgnizationName} Inventory Dashboard</p>
        </div>
    )
};

export default Header;