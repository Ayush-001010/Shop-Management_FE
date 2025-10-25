import React from "react";
import type IHeader from "./IHeader";

const Header: React.FC<IHeader> = () => {
    return (
        <div className="flex justify-end items-center">
            <p className={`cursor-pointer delay-300 transition duration-300 ease-in-out border border-[#343a40] text-[#343a40] font-medium flex justify-center text-lg  m-0 w-3xs rounded-lg p-1 hover:bg-[#343a40] hover:text-white`}>Add New Product</p>
        </div>
    )
};

export default Header;