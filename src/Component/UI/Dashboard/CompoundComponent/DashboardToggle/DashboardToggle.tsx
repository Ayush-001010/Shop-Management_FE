import React from "react";
import type IDashboardToggle from "./IDashboardToggle";
import styles from "../CompoundComponent.module.css";
import { useGetDashboardContextValue } from "../../Dashboard";

const DashboardToggle: React.FC<IDashboardToggle> = () => {
    const contextVal = useGetDashboardContextValue();
    const changeView = contextVal?.changeView;
    const isTableView = contextVal?.isTableView;

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
                onClick={() => changeView('board')}
            >
                <i className="bi bi-clipboard-data mr-1" />
                <span>Board</span>
            </div>
        </div>
    )
};

export default DashboardToggle;