import React from "react";
import type IHeader from "./IHeader";

const Header: React.FC<IHeader> = () => {
    return (
        <div>
            <p className="text-lg font-medium text-[#212529] text-shadow-xs">Sell Analytics</p>
        </div>
    )
};

export default Header;