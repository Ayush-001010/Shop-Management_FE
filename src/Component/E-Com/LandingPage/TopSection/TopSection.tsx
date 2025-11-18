import React from "react";
import type ITopSection from "./ITopSection";
import SearchBar from "./SearchBar/SearchBar";
import Cart from "./Cart/Cart";

const TopSection: React.FC<ITopSection> = () => {
    return (
        <div className="flex justify-end m-2">
            <SearchBar />
            <Cart />
        </div>
    )
};

export default TopSection;
