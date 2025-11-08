import React from "react";
import type ICircularUI from "./ICircularUI";

const CircularUI: React.FC<ICircularUI> = ({ ImageURL, Category }) => {
    return (
        <div className="h-[180px] mx-4">
            <div className="w-[144px] h-[144px] rounded-full overflow-hidden">
                <img src={ImageURL} alt={`${Category} Image`} className="w-full h-full object-cover rounded-full shadow-sm" loading="lazy"/>
            </div>
            <p className="text-lg font-medium text-[#212529] flex justify-center items-center text-shadow-xs">{Category}</p>
        </div>
    )
};

export default CircularUI;