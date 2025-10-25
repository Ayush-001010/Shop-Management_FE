export default interface ICalendarDataInterface {
    startDate: Date;
    endDate: Date;
    status: "On-Going" | "Delayed" | "Finished";
    title: string;
}