import React from "react";
import type ICalendarDisplay from "./ICalendarDisplay";
import CalendarDisplayHeader from "./CalendarDisplayHeader/CalendarDisplayHeader";
import styles from "./CalendarDisplay.module.css";
import { useCalenderContext } from "../Calender";
import CalendarItem from "./CalendarItem/CalendarItem";

const CalendarDisplay: React.FC<ICalendarDisplay> = () => {
    const { items } = useCalenderContext();
    return (
        <div className={`border-1 border-solid shadow-sm rounded-md ${styles.CommonBorderColor}`}>
            <CalendarDisplayHeader />
            {items.length === 0 && (
                <div className={`border-1 border-solid flex justify-center ${styles.CommonBorderColor}`}>
                    <p className={`m-1 ${styles.textOfNoDataCss}`}>No upcoming requests have been placed.</p>
                </div>
            )}
            <div className="overflow-auto h-30">
                {items.map((item) => <CalendarItem item={item} />)}
            </div>
        </div>
    )
};

export default CalendarDisplay;