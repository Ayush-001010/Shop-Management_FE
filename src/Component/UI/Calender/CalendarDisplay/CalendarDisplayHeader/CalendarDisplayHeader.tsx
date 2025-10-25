import React from "react";
import { useCalenderContext } from "../../Calender";
import styles from "../CalendarDisplay.module.css";

const CalendarDisplayHeader: React.FC<{}> = () => {
    const { dateConfig } = useCalenderContext();
    return (
        <div className="flex justify-between">
            <div className={`border-1 border-solid w-32 flex justify-center ${styles.CommonBorderColor}`}></div>
            {dateConfig.map(item =>
                <div className={`border-1 border-solid w-32 flex flex-col  items-center justify-center ${styles.CommonBorderColor}`}>
                    <p className={` text-sm ${styles.CalendarHeaderTextCss}`}>{item.day}</p>
                    <p className={` text-2xl ${styles.CalendarHeaderTitleCss}`}>{item.date}</p>
                </div>)}
        </div>
    )
};

export default CalendarDisplayHeader;