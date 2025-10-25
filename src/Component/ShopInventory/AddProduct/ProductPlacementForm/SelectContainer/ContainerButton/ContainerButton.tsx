import React from "react";
import type IContainerButton from "./IContainerButton";
import { Button } from "antd";
import styles from "./ContainerButton.module.css";

const ContainerButton: React.FC<IContainerButton> = ({ containerData, containerSelectHandler }) => {
    const fillPercentage = (100 - Math.min(Math.max(containerData.AvaliableSpace, 0), 100));

    const clickHandler = () => {
        containerSelectHandler(containerData.ID);
    }
    return (
        <div className="mx-10">
            <div className="mx-10">
                <div className={styles.buttonWrapper}>
                    <div
                        className={styles.fillBar}
                        style={{ width: `${fillPercentage}%` }}
                    />
                    <div className={styles.buttonOverlay}>
                        <Button className={styles.buttonCSS} onClick={clickHandler}>
                            <div className="flex items-center justify-center">
                                <p className="m-0 text-[#03045e]">
                                    <i className="bi bi-bookshelf mr-1 font-bold text-xl" />
                                </p>
                                <p className="m-0 text-[#03045e] font-semibold">
                                    Container {containerData.ContainerName}
                                </p>
                            </div>
                        </Button>
                    </div>
                </div>
                <div className="mt-1">
                    <p className="text-xs text-[#000814] font-semibold">{containerData.AvaliableSpace}% of Space Still Available</p>
                </div>
            </div>
        </div>
    );
};

export default ContainerButton;
