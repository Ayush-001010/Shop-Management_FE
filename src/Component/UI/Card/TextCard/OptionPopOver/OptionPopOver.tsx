import React from "react";
import type IOptionPopOver from "./IOptionPopOver";
import { Popover } from "antd";
import styles from "../TextCard.module.css";

const OptionPopOver: React.FC<IOptionPopOver> = ({ options }) => {
    const content = <div>
        {options?.map(item => <p>{item}</p>)}
    </div>
    return <div className="flex justify-end w-full">
        <Popover content={content} title="" trigger="click">
            <p className={`${styles.iconCss} rounded-4xl w-10 flex justify-center`}>
                <i className="bi bi-three-dots" />
            </p>
        </Popover>
    </div>
};

export default OptionPopOver;