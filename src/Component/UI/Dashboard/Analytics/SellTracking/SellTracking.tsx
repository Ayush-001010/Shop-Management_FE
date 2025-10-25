import React from "react";
import type ISellTracking from "./ISellTracking";
import Header from "./Header/Header";
import Content from "./Content/Content";

const SellTracking: React.FC<ISellTracking> = () => {

    return (
        <div className="border shadow-sm rounded-lg w-1/2 p-2 m-1">
            <Header />
            <Content />
        </div>
    )
};

export default SellTracking;