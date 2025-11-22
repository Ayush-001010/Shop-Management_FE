import React from "react";
import type IProductItemDashboard from "./IProductItemDashboard";
import Filters from "./Filters/Filters";
import TopSection from "../TopSection/TopSection";
import ItemDashboard from "./ItemDashboard/ItemDashboard";

const ProductItemDashboard: React.FC<IProductItemDashboard> = () => {
    return (
        <div className="flex h-full">
            <Filters />
            <div>
                <div>
                    <TopSection />
                </div>
                <ItemDashboard />
            </div>
        </div>
    )
};

export default ProductItemDashboard;