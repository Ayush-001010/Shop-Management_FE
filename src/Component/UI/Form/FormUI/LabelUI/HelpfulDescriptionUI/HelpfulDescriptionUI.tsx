import React from 'react';
import type IHelpfulDescriptionUI from './IHelpfulDescriptionUI';
import { Tooltip } from 'antd';
import styles from "./HelpfulDescriptionUI.module.css";

const HelpfulDescriptionUI: React.FunctionComponent<IHelpfulDescriptionUI> = ({description}) => {
    return (
        <div>
            <Tooltip title={description}>
                <p className={`text-xs font-medium ${styles.helpfulDescriptionCss}`}>Helpful Description</p>
            </Tooltip>
        </div>
    )
};

export default HelpfulDescriptionUI;