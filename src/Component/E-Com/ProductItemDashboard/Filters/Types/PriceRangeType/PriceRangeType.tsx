import React, { useEffect, useState } from "react";
import type IPriceRangeType from "./IPriceRangeType";
import Header from "../../Header/Header";
import { Slider } from "antd";
import useProjectItemDashboardAction from "../../../../../../Services/CustomHook/useProjectItemDashboardAction";
import DotLoader from "../../../../../UI/Loader/DotLoader/DotLoader";

const PriceRangeType: React.FC<IPriceRangeType> = () => {
    const { getFilterItems } = useProjectItemDashboardAction();
    const [value, setValue] = useState<Array<number>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [range , setRange] = useState<{ min: number, max: number }>({ min: 0, max: 0 });

    const changeHandler = (val: Array<number>) => {
        setValue(val);
    }
    useEffect(() => {
        setIsLoading(true);
        getFilterItems("Category_Price_Range").then((response: { success: boolean, data?: any }) => {
            console.log("Response for Category_Price_Range:", response);
            const { min, max } = response?.data || { min: 0, max: 0 };
            setValue([min / max, max]);
            setIsLoading(false);
            setRange({ min, max });
        });
    }, [])
    return (
        <div>
            <Header text={"Price"} />
            {isLoading && <DotLoader />}
            {!isLoading && <Slider range marks={{ 0: range.min, 100 : range.max }} value={value} onChange={changeHandler}/>}
        </div>
    )
};

export default PriceRangeType;