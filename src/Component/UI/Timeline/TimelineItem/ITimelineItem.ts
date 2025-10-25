import type ITimelineInterface from "../../../../Services/Interface/TimelineInterface";

export default interface ITimelineItem {
    item: ITimelineInterface;
    stepNumber: number;
    currentTimelineIndex: number;
    editClickHandler?: (value: number) => void;
}