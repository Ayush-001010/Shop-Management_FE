import React from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis , Tooltip } from "recharts";
import type IAnalyticsLine from "./IAnalyticsLine";
import { useGetAnalyticContext } from "../../Analytics";

const AnalyticsLine: React.FC<IAnalyticsLine> = () => {
    const { data , analyticValue } = useGetAnalyticContext();

    return (
        <div className="w-full">
            <LineChart width={1200} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="value" stroke="#212529" strokeWidth={2} name={`${analyticValue} of 1 year`}/>
                <XAxis dataKey="title" stroke="#212529"  />
                <YAxis width="auto" label={{ value: 'Value', position: 'insideLeft', angle: -90 }} stroke="#212529" />
                <Tooltip/>
                <Legend align="right" />  
            </LineChart>
        </div>
    );
};

export default AnalyticsLine;