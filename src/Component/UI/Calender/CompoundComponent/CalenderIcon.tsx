import React from "react";
import styles from "./CompoundComponent.module.css";

const CalenderIcon : React.FC<{}> = () => {
    return (
        <div className={styles.CalenderIconCss}>
            <i className="bi bi-calendar"/>
        </div>
    )
};

export default CalenderIcon;