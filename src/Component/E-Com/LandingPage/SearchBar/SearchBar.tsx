import React from "react";
import type ISearchBar from "./ISearchBar";
import { Input } from "antd";

const SearchBar: React.FC<ISearchBar> = () => {
    return (
        <div>
            <Input.Search />
        </div>
    )
};

export default SearchBar;