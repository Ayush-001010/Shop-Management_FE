import React from "react";
import type IRowByRowCards from "./IRowByRowCards";
import { useGetDashboardContextValue } from "../../Dashboard";
import type { IDashboardCardInterface } from "../../../../../Services/Interface/DashboardInterface";
import Count from "../UI/Count/Count";
import Percentage from "../UI/Percentage/Percentage";
import ProfitAndLoss from "../UI/ProfitAndLoss/ProfitAndLoss";

const RowByRowCards: React.FC<IRowByRowCards> = () => {
    const { cardConfig } = useGetDashboardContextValue();
    return (
        <div className="flex">
            {cardConfig?.map((item: IDashboardCardInterface) => {
                const { type } = item;
                switch (type) {
                    case "count": {
                        return <Count data={item} />
                    }
                    case "percentage": {
                        return <Percentage data={item}/>
                    }
                    case "profit&loss": {
                        return <ProfitAndLoss data={item}/>
                    }
                }
            })}
        </div>
    )
};

export default RowByRowCards;