import React from "react";
import type ICircularUI from "./ICircularUI";

const CircularUI: React.FC<ICircularUI> = ({ ImageURL, Category }) => {
    return (
        <div className="h-[185px] mx-4">
            <div className="w-32 h-32 rounded-full overflow-hidden">
                <img src={ImageURL} alt={`${Category} Image`} className="w-full h-full object-cover rounded-full shadow-sm"/>
            </div>
            <p className="text-lg font-medium text-[#212529] flex justify-center items-center text-shadow-xs">{Category}</p>
        </div>
    )
};

export default CircularUI;