import type ICalendarDataInterface from "../../../Services/Interface/CalendarInterface";
import type { IOptionsInterface } from "../../../Services/Interface/CommonInterface";

export default interface ICalender {
    title?: string;
    calenderOptions?: Array<IOptionsInterface>;
    currentDayDisplay: number;
    items: Array<ICalendarDataInterface>;
}