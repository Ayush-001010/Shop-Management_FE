import React from "react";
import type ITextCard from "./ITextCard";
import OptionPopOver from "./OptionPopOver/OptionPopOver";
import styles from "./TextCard.module.css";

const TextCard: React.FC<ITextCard> = ({ icon, title, value, isOption, optionValue }) => {
    return <div className="w-full rounded-xl shadow-lg mt-3 p-2">
        <div className="h-10">
            {isOption && <OptionPopOver options={optionValue} />}
        </div>
        <div className="flex w-full">
            {icon && <div className={`${styles.mainDivIconCss} w-40 rounded-lg flex justify-center items-center`}>
                <p className={`${icon} ${styles.mainIconCss} m-0 font-bold text-5xl`} />
            </div>}
            <div className={`ml-4`}>
                <p className={`${styles.titleCSS} text-lg font-semibold flex justify-center w-full`}>{title}</p>
                <p className={`${styles.valueCSS} text-md flex justify-center`}>{value}</p>
            </div>
        </div>
    </div>
};

export default TextCard;