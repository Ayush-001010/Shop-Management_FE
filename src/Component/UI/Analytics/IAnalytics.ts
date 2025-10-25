import type { IAnalyticsDataInterface, IAnalyticsOptionInterface } from "../../../Services/Interface/AnalyticsInterface";

export default interface IAnalytics {
    analyticsOption: Array<IAnalyticsOptionInterface>;
    defaultValue: string;
    data: Array<IAnalyticsDataInterface>;
    analyticTypeChange: (newValue: string) => void;
}