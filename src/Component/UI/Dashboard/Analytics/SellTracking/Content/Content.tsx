import React, { useEffect, useState } from "react";
import type IContent from "./IContent";
import { useDashboardSpecialAction } from "../../../../../../Services/CustomHook/useDashboardAction";
import { useGetDashboardContextValue } from "../../../Dashboard";
import { Tooltip } from "antd";

const Content: React.FC<IContent> = () => {
    const { getLastSevenDaysValueOnArr, getHeightOfSellTrackingBar } = useDashboardSpecialAction();
    const { sellTrackingData } = useGetDashboardContextValue();
    const [days, setDays] = useState<Array<string>>([]);
    const [barHeight, setBarHeight] = useState<Array<{ height: number, title: string, color: string }>>([]);


    useEffect(() => {
        const arr = getLastSevenDaysValueOnArr();
        setDays(arr);
    }, []);
    useEffect(() => {
        if (sellTrackingData) {
            const arr = getHeightOfSellTrackingBar(sellTrackingData);
            setBarHeight(arr);
        }
    }, [sellTrackingData]);

    return (
        <div className="flex justify-between h-1/2 p-2">
            {days.map((dayItem: string, index: number) => (
                <div className="h-85 items-end flex flex-col justify-end">
                    <Tooltip title={barHeight.length > index ? barHeight[index].title:""}>
                        <p
                            style={{
                                height: barHeight.length > index ? `${barHeight[index].height}px` : "0px",
                                backgroundColor: barHeight.length > index ? barHeight[index].color : "transparent",
                            }}
                            className="m-0 w-full rounded-3xl shadow-lg"
                        ></p>
                    </Tooltip>

                    <p className="m-0 text-sm font-medium text-[#6c757d]">{dayItem}</p>
                </div>
            ))}
        </div>
    )
};

export default Content;