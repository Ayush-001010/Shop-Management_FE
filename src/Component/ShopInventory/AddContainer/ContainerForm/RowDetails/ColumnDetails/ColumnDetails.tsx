import React from "react";
import type IColumnDetails from "./IColumnDetails";
import { Input } from "antd";
import styles from "../../../AddContainer.module.css";

const ColumnDetails: React.FC<IColumnDetails> = ({ changeWidth  }) => {
    return (
        <div>
            <p className={`${styles.labelCSS} m-0 font-medium`}>Column Width</p>
            <Input type="number" onChange={({ target }) => changeWidth(Number(target.value))} />
        </div>
    )
};

export default ColumnDetails;