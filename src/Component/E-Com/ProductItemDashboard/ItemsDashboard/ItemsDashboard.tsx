import React, { useMemo } from "react";
import type IItemsDashboard from "./IItemsDashboard";
import { useSelector } from "react-redux";
import ItemStyle3 from "../../UI/ItemStyle3";

const ItemsDashboard: React.FC<IItemsDashboard> = ({ data }) => {
    const { itemSchema } = useSelector((state: any) => state.ecom);
    const UIType = useMemo(() => itemSchema?.UIType, [itemSchema]);
    console.log(" Item Schema in Items Dashboard Component : ", UIType);

    return (
        <div className="mx-5 w-full grid grid-cols-2 gap-x-20 gap-y-10">
            {data.map((item: any) => {
                switch (UIType) {
                    case "Style 3": return <ItemStyle3 data={item} />
                }
                return <></>
            })}
        </div>
    )
};

export default ItemsDashboard;