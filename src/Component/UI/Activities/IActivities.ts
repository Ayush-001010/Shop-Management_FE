import type { IOptionsInterface } from "../../../Services/Interface/CommonInterface";

export default interface IActivities {
    activitiesOption: Array<IOptionsInterface>;
    activityHandler: (type: string) => void;
    activityData: Array<any>;
}