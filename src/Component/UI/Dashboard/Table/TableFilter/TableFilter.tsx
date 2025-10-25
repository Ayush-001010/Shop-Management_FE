import React, { useEffect, useState } from "react";
import type ITableFilter from "./ITableFilter";
import { useGetDashboardContextValue } from "../../Dashboard";
import { Button, Select } from "antd";
import styles from "./TableFilter.module.css";

const TableFilter: React.FC<ITableFilter> = () => {
    const { tableFilterConfig, filterOptions, applyHandlerOfFilterFunc, clearButtonApplied } = useGetDashboardContextValue();
    const [value, setValue] = useState<Record<string, any>>({});

    const applyHandler = () => {
        if (applyHandlerOfFilterFunc) {
            applyHandlerOfFilterFunc(value, "All")
        }
    }
    const changeHandler = (newValue: string, backendName: string) => {
        setValue((prev) => {
            return {
                ...prev,
                [backendName]: newValue
            };
        })
    }
    useEffect(() => {
        const { type } = clearButtonApplied;
        if (type === "All") {
            setValue({});
        }
    }, [clearButtonApplied]);

    return (
        <div className="flex w-full justify-between mt-2 items-center">
            <div className="flex justify-between w-1/2 items-center">
                {tableFilterConfig?.map((field) => {
                    const { displayName, backendName } = field;
                    return <div className="flex flex-col w-full px-2">
                        <label className="font-semibold">{displayName}</label>
                        <Select value={value[backendName] ? value[backendName] : ""} className={styles.selectFieldCss} options={filterOptions ? filterOptions[backendName] || [] : []} onChange={(newValue) => changeHandler(newValue as string, backendName)} />
                    </div>
                })}
            </div>
            <div>
                <Button className={styles.buttonCss} onClick={applyHandler}>Apply</Button>
            </div>
        </div>
    )
};

export default TableFilter;