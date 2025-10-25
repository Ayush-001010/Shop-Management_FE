import React from "react";
import type IHeader from "./IHeader";

const Header: React.FC<IHeader> = () => {
    return (
        <div className={`w-full flex justify-end `}>
            <p className={` border border-[#343a40] text-[#343a40] font-medium flex justify-center text-lg  m-0 w-3xs rounded-lg p-1`}>Add New Container</p>
        </div>
    )
};

export default Header;