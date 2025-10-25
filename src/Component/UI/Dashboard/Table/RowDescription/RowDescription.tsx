import React from "react";
import type IRowDescription from "./IRowDescription";
import styles from "../TableUI.module.css";
import DashboardConfig from "../../../../../Services/Config/DashboardConfig";
import moment from "moment";
import { useGetDashboardContextValue } from "../../Dashboard";
import type ITableInterface from "../../../../../Services/Interface/DashboardInterface";

const RowDescription: React.FC<IRowDescription> = ({ data }) => {
    const { changeHandlerBigTextModal, orginalTableConfig: config } = useGetDashboardContextValue();

    const genrateValue = (key: string, title: string) => {
        if (DashboardConfig.dateCols.includes(key)) {
            return data[key] ? moment(data[key]).format("DD-MM-YYYY") : "";
        } else if (DashboardConfig.bigTextCols.includes(key)) {
            const str: string = data[key];
            return data[key] ? <span onClick={() => changeHandlerBigTextModal({ open: true, text: data[key], propertyName: title })}>{str.split(" ").slice(0, 4).join(" ") + "..."}</span> : "";
        }
        return data[key];
    }
    return (
        <div className="flex justify-between w-full flex-wrap">
            {config?.map((item: ITableInterface) => {
                const { displayName: title, backendName: key } = item;
                return <div className="w-1/2 flex">
                    <p className={`w-1/2 font-semibold ${styles.RowExpandTitle}`}>{title} </p>
                    <p className="mr-1">:</p>
                    <p className={`w-1/2 font-semibold ${styles.RowExpandValue}`}>{genrateValue(key, title)}</p>
                </div>
            })}
        </div>
    )
};

export default RowDescription;