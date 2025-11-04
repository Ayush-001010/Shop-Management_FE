import React from "react";
import type { IHeader } from "./IHeader";

const Header: React.FC<IHeader> = () => {
    return (
        <div>
            <p className="text-lg text-[#212529] font-medium">Choose a Landing Page Section:-</p>
        </div>
    )
};

export default Header;