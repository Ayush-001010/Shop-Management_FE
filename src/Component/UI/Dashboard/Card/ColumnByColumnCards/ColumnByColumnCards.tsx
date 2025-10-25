import React from "react";
import type IColumnByColumnCards from "./IColumnByColumnCards";
import { useGetDashboardContextValue } from "../../Dashboard";
import type { IDashboardCardInterface } from "../../../../../Services/Interface/DashboardInterface";
import Count from "../UI/Count/Count";
import Percentage from "../UI/Percentage/Percentage";
import ProfitAndLoss from "../UI/ProfitAndLoss/ProfitAndLoss";

const ColumnByColumnCards: React.FC<IColumnByColumnCards> = () => {
    const { columnCardConfig } = useGetDashboardContextValue();
    return (
        <div className="flex flex-col">
            {columnCardConfig?.map((cardConfig: IDashboardCardInterface) => {
                const { type } = cardConfig;
                switch (type) {
                    case "count": {
                        return <Count data={cardConfig} />
                    }
                    case "percentage": {
                        return <Percentage data={cardConfig} />
                    }
                    case "profit&loss": {
                        return <ProfitAndLoss data={cardConfig} />
                    }
                }
            })}
        </div>
    )
};

export default ColumnByColumnCards;