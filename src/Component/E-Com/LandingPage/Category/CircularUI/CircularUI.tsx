import React from "react";
import type ICircularUI from "./ICircularUI";

const CircularUI: React.FC<ICircularUI> = ({ ImageURL, Category }) => {
    return (
        <div className="h-[250px]">
            <div className="w-full h-full rounded-full overflow-hidden">
                <img src={ImageURL} alt={`${Category} Image`} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <p className="text-lg">{Category}</p>
        </div>
    )
};

export default CircularUI;