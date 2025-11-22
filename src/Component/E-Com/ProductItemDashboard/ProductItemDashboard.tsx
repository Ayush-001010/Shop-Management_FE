import React, { useEffect, useState } from "react";
import type IProductItemDashboard from "./IProductItemDashboard";
import Filters from "./Filters/Filters";
import TopSection from "../TopSection/TopSection";
import ItemsDashboard from "./ItemsDashboard/ItemsDashboard";
import useProductItemDashboardAction from "../../../Services/CustomHook/useProductItemDashboardAction";
import { message } from "antd";
import CommonConfig from "../../../Services/Config/CommonConfig";
import type { IItemInterface } from "../../../Services/Interface/EComInterface";

const ProductItemDashboard: React.FC<IProductItemDashboard> = () => {
    const { getItems } = useProductItemDashboardAction();
    const [pageNo, setPageNo] = useState<number>(0);
    const [messageAPI, contextHandler] = message.useMessage();
    const [items, setItems] = useState<Array<IItemInterface>>([]);

    useEffect(() => {
        getItems(pageNo).then((res: { success: boolean, data?: any }) => {
            if (res.success) {
                setPageNo((prevState) => prevState + 1);
                setItems((prevState) => {
                    const arr = res.data as IItemInterface[] || [];
                    return [...prevState, ...arr];
                });
            }
        }).catch(() => {
            messageAPI.error(CommonConfig.errorMessage);
        })
    }, [])
    return (
        <div className="flex h-full ">
            {contextHandler}
            <Filters />
            <div>
                <div className="w-full flex justify-end mb-1">
                    <TopSection />
                </div>
                <ItemsDashboard data={items} />
            </div>
        </div>
    )
};

export default ProductItemDashboard;