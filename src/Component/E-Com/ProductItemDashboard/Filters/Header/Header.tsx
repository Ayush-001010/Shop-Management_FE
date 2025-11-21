import React from "react";
import type IHeader from "./IHeader";

const Header: React.FC<IHeader> = ({ text }) => {
    return (
        <div>
            <p>
                {text}
            </p>
        </div>
    )
};

export default Header;