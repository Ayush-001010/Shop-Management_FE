import React from "react";
import type IAnalyticsHeader from "./IAnalyticsHeader";
import { useGetAnalyticContext } from "../Analytics";
import styles from "../Analytic.module.css";

const AnalyticsHeader: React.FC<IAnalyticsHeader> = () => {
    const { analyticValue } = useGetAnalyticContext();
    return (
        <div>
            <p className={`text-lg font-bold ${styles.headerCss}`}>{analyticValue}</p>
        </div>
    )
};

export default AnalyticsHeader;