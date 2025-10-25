import { useEffect, useState } from "react";
import type { ICalendarDateConfig } from "../Interface/CommonInterface";
import CommonConfig from "../Config/CommonConfig";

const useCalendarAction = (days: number) => {
    const [dateConfig, setDateConfig] = useState<Array<ICalendarDateConfig>>([]);

    const genrateDateConfig = () => {
        const arr: Array<ICalendarDateConfig> = [];
        const currentDate = new Date();
        let currentDayIndex = currentDate.getDay();
        const dayDisplayConfig = CommonConfig.days;
        let daysVal = days;
        while (daysVal > 0) {
            if (currentDayIndex === dayDisplayConfig.length) {
                currentDayIndex = 0;
            }
            const obj: ICalendarDateConfig = {
                date: currentDate.getDate().toString(),
                day: dayDisplayConfig[currentDayIndex]
            }
            currentDate.setDate(currentDate.getDate() + 1);
            arr.push(obj);
            currentDayIndex++;
            daysVal--;
        }
        setDateConfig(arr);
    }
    useEffect(() => {
        genrateDateConfig();
    }, [days]);
    return { dateConfig };
};

export default useCalendarAction;