import React from "react";
import type ICircularUI from "./ICircularUI";
import { Link } from "react-router-dom";
import { useGetEcomContext } from "../../../E-Com";

const CircularUI: React.FC<ICircularUI> = ({ ImageURL, Category }) => {
    const { currentShopID } = useGetEcomContext();
    return (
        <div className="h-[185px] mx-4">
            <Link to={`/E-Com/${currentShopID}/Category/${Category}`} style={{textDecoration:"none"}} >
                <div className="w-32 h-32 rounded-full overflow-hidden cursor-pointer">
                    <img src={ImageURL} alt={`${Category} Image`} className="w-full h-full object-cover rounded-full shadow-xl" />
                </div>
                <p className="text-lg font-medium text-[#212529] flex justify-center items-center text-shadow-xs">{Category}</p>
            </Link>
        </div>
    )
};

export default CircularUI;