import type ITimelineInterface from "../../../Services/Interface/TimelineInterface";

export default interface ITimeline {
    items: Array<ITimelineInterface>;
    currentTimelineIndex: number;
    editClickHandler?: (value: number) => void;
}