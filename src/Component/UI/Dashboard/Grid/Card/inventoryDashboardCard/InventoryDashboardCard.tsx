import React from "react";
import type IInventoryDashboardCard from "./IInventoryDashboardCard";
import { useGetDashboardContextValue } from "../../../Dashboard";
import styles from "../../Grid.module.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const InventoryDashboardCard: React.FC<IInventoryDashboardCard> = ({ data }) => {
    const { columnConfig, changeHandlerBigTextModal } = useGetDashboardContextValue();
    const { setNodeRef, attributes, listeners, transition, transform } = useSortable({ id: data.id });

    return (
        <div className="shadow-lg border rounded-lg w-80 my-1 mx-2" ref={setNodeRef} style={{ transition, transform: CSS.Transform.toString(transform) }}>
            <div className={`${styles.InventoryDashboardCardDataheaderDivCSS} flex justify-start item-center`}>
                <div>
                    <p {...attributes} {...listeners} className="m-0 flex items-center">
                        <i className={`bi bi-three-dots-vertical w-1 ${styles.headerToggleIconCss}`} />
                        <i className={`bi bi-three-dots-vertical w-1 ${styles.headerToggleIconCss}`} />
                    </p>
                </div>
                <div className="flex justify-center items-center w-full">
                    <p className="m-0">{data["shopname"]}</p>
                </div>
            </div>
            <div className="flex flex-wrap mt-2 p-1">
                {columnConfig.map((item) => {
                    const { backendName, displayName, isBigTextColumn, isHideField } = item;
                    if (isHideField) return;
                    return <p className={`w-1/2 text-xs font-semibold ${styles.InventoryDashboardCardDataCSS} my-1`}>
                        {displayName}:
                        {isBigTextColumn ? <span className={`font-normal ml-1 ${styles.InventoryDashboardCardDataBigTextCSS}`} onClick={() => changeHandlerBigTextModal({ open: true, text: data[backendName], propertyName: displayName })}>{data[backendName].split(" ").splice(0, 4).join(" ") + "..."}</span>
                            : <span className="font-normal ml-1">{data[backendName]}</span>
                        }
                    </p>
                })}
            </div>
        </div>
    )
};

export default InventoryDashboardCard;