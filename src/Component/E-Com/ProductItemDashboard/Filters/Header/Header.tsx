import React from "react";
import type IHeader from "./IHeader";

const Header: React.FC<IHeader> = ({ text }) => {
    return (
        <div>
            <p className="font-bold text-[#000814] m-0">
                {text}
            </p>
        </div>
    )
};

export default Header;