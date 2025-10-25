import React from "react";
import { useCalenderContext } from "../Calender";
import { Select } from "antd";

const CalenderOption: React.FC = () => {
    const { calenderOptions , currentDayDisplay } = useCalenderContext();
    return (
        <div className="w-50 flex justify-end mr-1">
            <Select value={currentDayDisplay} options={calenderOptions} />
        </div>
    )
};

export default CalenderOption;