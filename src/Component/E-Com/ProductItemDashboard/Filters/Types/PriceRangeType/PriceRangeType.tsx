import React, { useEffect, useState } from "react";
import type IPriceRangeType from "./IPriceRangeType";
import Header from "../../Header/Header";
import { Slider } from "antd";
import DotLoader from "../../../../../UI/Loader/DotLoader/DotLoader";
import useProductItemDashboardAction from "../../../../../../Services/CustomHook/useProductItemDashboardAction";

const PriceRangeType: React.FC<IPriceRangeType> = () => {
    const { getFilterItems } = useProductItemDashboardAction();
    const [value, setValue] = useState<Array<number>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [range, setRange] = useState<{ min: number, max: number }>({ min: 0, max: 0 });

    const changeHandler = (val: Array<number>) => {
        setValue(val);
    }
    useEffect(() => {
        setIsLoading(true);
        getFilterItems("Category_Price_Range").then((response: { success: boolean, data?: any }) => {
            const { min, max } = response?.data || { min: 0, max: 0 };
            setValue([min / max, max]);
            setIsLoading(false);
            setRange({ min, max });
        });
    }, [])
    return (
        <div className="my-1">
            <Header text={"Price"} />
            {isLoading && <DotLoader />}
            {!isLoading && (
                <div className="p-2 w-3xs">
                    <Slider range marks={{ 0: range.min, 100: range.max }} value={value} onChange={changeHandler} />
                </div>
            )}
        </div>
    )
};

export default PriceRangeType;