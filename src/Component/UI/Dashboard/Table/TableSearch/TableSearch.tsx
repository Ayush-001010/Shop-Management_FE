import React, { useEffect, useState } from "react";
import type ITableSearch from "./ITableSearch";
import { Input } from "antd";
import { useGetDashboardContextValue } from "../../Dashboard";

const TableSearch: React.FC<ITableSearch> = () => {
    const [searchStr, setSearchStr] = useState<string>("");
    const { searchHandler, clearButtonApplied } = useGetDashboardContextValue();

    const changeHandler = ({ target }: any) => {
        setSearchStr(target.value);
    }
    const applyHandler = () => {
        if (searchHandler) {
            searchHandler(searchStr, "All");
        }
    }

    useEffect(() => {
        const obj = setTimeout(() => {
            if (searchStr.trim().length > 0)
                applyHandler();
        }, 2000);
        return () => clearTimeout(obj);
    }, [searchStr]);
    useEffect(() => {
        const { type } = clearButtonApplied;
        if (type === "All") {
            setSearchStr("");
        }
    }, [clearButtonApplied]);
    
    return (
        <div className="flex justify-end mt-2">
            <div className="w-1/5">
                <Input.Search onChange={changeHandler} value={searchStr} />
            </div>
        </div>
    )
};

export default TableSearch;