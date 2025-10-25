import React from "react";
import type IActivitesContent from "./IActivitesContent";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

const ActivitesContent: React.FC<IActivitesContent> = ({activityData}) => {
    return (
        <div className="h-full">
            <BarChart width={400} height={200} data={activityData}>
                <XAxis dataKey="name" />
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="value" barSize={20} fill="#adb5bd" />
            </BarChart>
        </div>
    )
};

export default ActivitesContent;