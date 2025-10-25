import React from "react";
import type IGridDashboardToogle from "./IGridDashboardToogle";
import styles from "../../CompoundComponent.module.css";
import { useGetDashboardContextValue } from "../../../Dashboard";

const GridDashboardToogle: React.FC<IGridDashboardToogle> = () => {
    const { isTableView, changeView } = useGetDashboardContextValue();
    return (
        <div className={`relative flex w-40 h-10 rounded-xl p-1 ${styles.ToggleCss}`}>
            <div
                className={`${styles.activeToggleCss}`}
                style={{
                    left: isTableView ? '0%' : '50%',
                }}
            />
            <div
                className={`${styles.InActiveToggleCss}`}
                onClick={() => changeView('table')}
            >
                <i className="bi bi-table mr-1" />
                <span>Table</span>
            </div>
            <div
                className={`${styles.InActiveToggleCss}`}
                onClick={() => changeView('grid')}
            >
                <i className="bi bi-grid-3x3-gap-fill mr-1" />
                <span>Grid</span>
            </div>
        </div>
    )
};

export default GridDashboardToogle;