import React, { createContext, useContext, type ReactNode } from "react";
import Title from "./CompoundComponent/Title";
import type ICalender from "./ICalender";
import CalenderOption from "./CompoundComponent/CalenderOption";
import type { ICalendarDateConfig, IOptionsInterface } from "../../../Services/Interface/CommonInterface";
import CalenderRange from "./CompoundComponent/CalenderRange";
import CalenderIcon from "./CompoundComponent/CalenderIcon";
import useCalendarAction from "../../../Services/CustomHook/useCalendarAction";
import CalendarDisplay from "./CalendarDisplay/CalendarDisplay";
import type ICalendarDataInterface from "../../../Services/Interface/CalendarInterface";

type ICalenderContext = {
    title?: string;
    calenderOptions?: Array<IOptionsInterface>;
    currentDayDisplay: number;
    dateConfig: Array<ICalendarDateConfig>;
    items: Array<ICalendarDataInterface>;
}

const CalenderContext = createContext<ICalenderContext | undefined>(undefined);

export const useCalenderContext = () => {
    const context = useContext(CalenderContext);
    if (!context) throw new Error('Components must be used within <Calender />');
    return context;
}

interface CalenderComponent extends React.FC<ICalender & { children: ReactNode }> {
    Title: typeof Title;
    CalenderOption: typeof CalenderOption;
    CalenderRange: typeof CalenderRange;
    CalenderIcon: typeof CalenderIcon;
}

const Calender: CalenderComponent = ({ children, title, calenderOptions, currentDayDisplay, items }) => {
    const { dateConfig } = useCalendarAction(currentDayDisplay);
    return (
        <CalenderContext.Provider value={{ title, calenderOptions, currentDayDisplay, dateConfig, items }}>
            <div className="shadow-sm rounded-xl p-3 ">
                {children}
                <CalendarDisplay />
            </div>
        </CalenderContext.Provider>
    )
};

Calender.Title = Title;
Calender.CalenderOption = CalenderOption;
Calender.CalenderRange = CalenderRange;
Calender.CalenderIcon = CalenderIcon;


export default Calender