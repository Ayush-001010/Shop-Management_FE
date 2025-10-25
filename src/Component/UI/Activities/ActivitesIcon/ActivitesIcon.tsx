import React from "react";
import type IActivitesIcon from "./IActivitesIcon";
import styles from "../Activities.module.css";

const ActivitesIcon: React.FC<IActivitesIcon> = () => {
    return (
        <div className="w-full flex justify-center items-center h-full">
            <i className={`bi bi-bar-chart-fill ${styles.iconCss}`}/>
        </div>
    )
};

export default ActivitesIcon;