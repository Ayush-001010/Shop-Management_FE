import React from "react";
import type ISearchBar from "./ISearchBar";
import { Input } from "antd";

const SearchBar: React.FC<ISearchBar> = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-xl">
                <Input.Search />
            </div>
        </div>
    )
};

export default SearchBar;