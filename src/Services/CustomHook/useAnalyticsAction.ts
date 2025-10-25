import { useEffect, useState } from "react";
import type { IAnalyticsOptionInterface } from "../Interface/AnalyticsInterface";
import type { IOptionsInterface } from "../Interface/CommonInterface";

const useAnalyticsAction = (analyticsOptions?: Array<IAnalyticsOptionInterface>) => {
    const [options, setOptions] = useState<Array<IOptionsInterface>>([]);

    const genrateOptions = () => {
        const opt: Array<IOptionsInterface> = [];
        analyticsOptions?.forEach((item: IAnalyticsOptionInterface) => {
            opt.push({ label: item.title, value: item.title });
        })
        setOptions(opt);
    }
    useEffect(() => {
        if (analyticsOptions) {
            genrateOptions();
        }
    }, [analyticsOptions]);

    return { options };
};

export default useAnalyticsAction;