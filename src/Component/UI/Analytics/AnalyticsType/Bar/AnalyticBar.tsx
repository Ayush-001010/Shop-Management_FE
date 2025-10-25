import React from "react";
import type IAnalyticBar from "./IAnalyticBar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useGetAnalyticContext } from "../../Analytics";

const AnalyticBar: React.FC<IAnalyticBar> = () => {
    const { data } = useGetAnalyticContext();
    return (
        <div>
            <BarChart width={1200} height={300} data={data}>
                <XAxis dataKey="title" stroke="#495057" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#495057" strokeDasharray="5 5" />
                <Bar dataKey="value" fill="#adb5bd" barSize={30} />
            </BarChart>
        </div>
    )
};

export default AnalyticBar;