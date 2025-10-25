import React from "react";
import type ISectionCard from "./ISectionCard";

const SectionCard: React.FC<ISectionCard> = ({ clickHandler, title, description }) => {
    return (
        <div className="shadow-sm flex flex-col justify-center items-center bg-[#dcdcdd] cursor-pointer group hover:bg-[#333533] p-2 rounded-lg" onClick={() => clickHandler(title)}>
            <p className="m-0 text-xl text-[#46494c] font-medium group-hover:text-[#dcdcdd]">{title}</p>
            <p className="m-0 text-xs text-[#46494c] font-light group-hover:text-[#dcdcdd]">{description}</p>
        </div>
    )
};

export default SectionCard;