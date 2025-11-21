import React from "react";
import type IProductItemDashboard from "./IProductItemDashboard";
import Filters from "./Filters/Filters";

const ProductItemDashboard: React.FC<IProductItemDashboard> = () => {
    return (
        <div className="flex h-full">
            <Filters />
        </div>
    )
};

export default ProductItemDashboard;