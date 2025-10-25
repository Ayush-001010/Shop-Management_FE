import React from "react";
import type IRectangularUI from "./IRectangularUI";

const RectangularUI: React.FC<IRectangularUI> = ({ ImageURL, Category }) => {
    return (
        <div className="w-24 h-24 rounded-lg overflow-hidden">
            <img src={ImageURL} alt={`${Category} Image`} className="w-full h-full object-cover" />
            <p>{Category}</p>
        </div>
    )
};

export default RectangularUI;