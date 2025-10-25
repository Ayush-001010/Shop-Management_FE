import React from "react";
import { useCalenderContext } from "../Calender";
import moment from "moment";
import styles from "./CompoundComponent.module.css";

const CalenderRange: React.FunctionComponent<{}> = () => {
    const { startDate, endDate } = useCalenderContext();
    return (
        <div className={`mr-2 ${styles.CalendarRangeCSS}`}>
            <i className="bi bi-chevron-compact-left" />
            <p>{moment(startDate).format('D MMM')}</p>
            <i className="bi bi-dash" />
            <p>{moment(endDate).format('D MMM')}</p>
            <i className="bi bi-chevron-right" />
        </div>
    )
};

export default CalenderRange;