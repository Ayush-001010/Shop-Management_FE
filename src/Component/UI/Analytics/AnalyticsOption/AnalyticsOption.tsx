import React from "react";
import type IAnalyticsOption from "./IAnalyticsOption";
import { Select } from "antd";
import { useGetAnalyticContext } from "../Analytics";

const AnalyticsOption: React.FC<IAnalyticsOption> = () => {
    const { analyticsOptions, changeHandlerAnalyticValue, analyticValue } = useGetAnalyticContext();
    return (
        <div>
            <Select options={analyticsOptions} value={analyticValue} onChange={(newValue: string) => changeHandlerAnalyticValue(newValue)} />
        </div>
    )
};

export default AnalyticsOption;