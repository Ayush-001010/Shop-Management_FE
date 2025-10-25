import React, { useEffect, useState } from "react";
import type IActivitiesHeader from "./IActivitiesHeader";
import { Select } from "antd";

const ActivitiesHeader: React.FC<IActivitiesHeader> = ({ activitiesOption, activityHandler }) => {
    const [activityType, setActivityType] = useState<string>("");

    const changeActivityType = (newValue: string) => {
        setActivityType(newValue);
    }

    useEffect(() => {
        const obj = setTimeout(() => {
            if (activityType.trim().length === 0) return;
            activityHandler(activityType);
        }, 3000);
        return () => clearTimeout(obj);
    }, [activityType])
    return (
        <div className="p-1 flex justify-between">
            <div>
                <p className="text-shadow-sm text-sm">Activities</p>
            </div>
            <div>
                <Select className="w-30" options={activitiesOption} value={activityType} onChange={changeActivityType} />
            </div>
        </div>
    )
};

export default ActivitiesHeader;