import React, { useEffect, useState } from "react";
import type IProfitAndLoss from "./IProfitAndLoss";
import { useDashboardSpecialAction } from "../../../../../../Services/CustomHook/useDashboardAction";
import { Spin } from "antd";
import styles from "../UI.module.css";


const ProfitAndLoss: React.FC<IProfitAndLoss> = ({ data }) => {
    const { title } = data;
    const [cardValue, setCardValue] = useState<string | undefined>(undefined);
    const { getCardValue } = useDashboardSpecialAction();

    useEffect(() => {
        getCardValue(data).then((response) => {
            setCardValue(response);
        })
    }, []);
    return (
        <div className="group m-1 bg-[#f8f9fa] hover:bg-[#343a40] border border-[#f8f9fa] rounded-lg shadow-sm p-4 w-full max-w-sm h-auto transition-colors duration-300 ease-in-out">
            <p className="text-center text-base font-semibold text-[#343a40] group-hover:text-[#f8f9fa] transition-colors duration-300 h-10">
                {title}
            </p>
            <p className="mt-2 flex justify-center items-center">
                {cardValue !== undefined ? <span className={`text-sm font-semibold  ${cardValue === "Profit" ? "text-[#2d6a4f]":""} group-hover:text-[#f8f9fa]`}>{cardValue}</span> : <span className="">
                    <Spin className={styles.loadingCSS} />
                </span>
                }
            </p>
        </div>
    )
};

export default ProfitAndLoss;