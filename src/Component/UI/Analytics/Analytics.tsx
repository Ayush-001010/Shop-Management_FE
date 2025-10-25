import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type IAnalytics from "./IAnalytics";
import AnalyticsOption from "./AnalyticsOption/AnalyticsOption";
import type { IOptionsInterface } from "../../../Services/Interface/CommonInterface";
import useAnalyticsAction from "../../../Services/CustomHook/useAnalyticsAction";
import AnalyticsHeader from "./AnalyticsHeader/AnalyticsHeader";
import type { IAnalyticsDataInterface, IAnalyticsOptionInterface } from "../../../Services/Interface/AnalyticsInterface";
import AnalyticsLine from "./AnalyticsType/Line/AnalyticsLine";
import AnalyticBar from "./AnalyticsType/Bar/AnalyticBar";

interface IAnalyticsContext {
    analyticsOptions?: Array<IOptionsInterface>;
    changeHandlerAnalyticValue: (newValue: string) => void;
    analyticValue: string;
    data: Array<IAnalyticsDataInterface>
}

const AnalyticsContext = createContext<IAnalyticsContext | undefined>(undefined);

export const useGetAnalyticContext = () => {
    const context = useContext(AnalyticsContext);
    if (!context) {
        throw new Error("Error On Getting Context");
    }
    return context;
}

interface AnalyticsComponent extends React.FC<IAnalytics & { children: ReactNode }> {
    Option: typeof AnalyticsOption
}

const Analytics: AnalyticsComponent = ({ analyticsOption, children, defaultValue, data, analyticTypeChange }) => {
    const { options } = useAnalyticsAction(analyticsOption);
    const [analyticValue, setAnalyticValue] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const changeHandlerAnalyticValue = (newValue: string) => {
        setAnalyticValue(newValue);
        setIsLoading(true);
        analyticTypeChange(newValue);
    }

    useEffect(() => {
        setAnalyticValue(defaultValue);
    }, [defaultValue])

    useEffect(() => {
        setIsLoading(false);
    }, [data])
    return (
        <AnalyticsContext.Provider value={{ analyticsOptions: options, analyticValue, changeHandlerAnalyticValue, data }}>
            <div className="rounded-xl shadow-lg p-2 m-2">
                <div>
                    <div className="flex justify-between">
                        <AnalyticsHeader />
                        {children}
                    </div>
                </div>
                {!isLoading && <div>
                    {analyticsOption?.map((item: IAnalyticsOptionInterface) => {
                        const { title, type } = item;
                        if (title !== analyticValue) return;
                        switch (type) {
                            case "line": return <AnalyticsLine />
                            case "bar": return <AnalyticBar />
                        }
                        return "";
                    })}
                </div>}
            </div>
        </AnalyticsContext.Provider>
    )
};

Analytics.Option = AnalyticsOption;

export default Analytics;