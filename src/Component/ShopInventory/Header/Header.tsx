import React from "react";
import type IHeader from "./IHeader";

const Header: React.FC<IHeader> = ({shopName}) => {

    return (
        <div className="flex flex-col">
            <p className="m-0 text-4xl font-noraml ">{shopName}</p>
            <p className="m-0 text-sm mt-1 text-[#6c757d] font-normal">Your shop's command center—add products, set prices, track stock, and keep everything in check! </p>
        </div>
    )
};

export default Header;