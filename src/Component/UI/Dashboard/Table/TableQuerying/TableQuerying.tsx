import React from "react";
import type ITableQuerying from "./ITableQuerying";
import { Button } from "antd";
import { useGetDashboardContextValue } from "../../Dashboard";
import styles from "./TableQuerying.module.css";

const TableQuerying: React.FC<ITableQuerying> = () => {
    const { isTableView, setTableQueryTypeFunc, clearHandler } = useGetDashboardContextValue();

    const onClickClearHandler = () => {
        if (clearHandler) {
            clearHandler("All");
        }
    }
    return (
        <div>
            {isTableView && <div>
                <Button className={`m-1 ${styles.buttonCss}`} onClick={() => setTableQueryTypeFunc("filter")}>Filter</Button>
                <Button className={`m-1 ${styles.buttonCss}`} onClick={() => setTableQueryTypeFunc("search")}>Search</Button>
                <Button className={`m-1 ${styles.buttonCss}`} onClick={onClickClearHandler}>Clear</Button>
            </div>}
        </div>
    )
};

export default TableQuerying;