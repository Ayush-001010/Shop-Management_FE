import type { IOptionsInterface } from "../../../../Services/Interface/CommonInterface";

export default interface IActivitiesHeader {
    activitiesOption: Array<IOptionsInterface>;
    activityHandler: (type: string) => void;
}