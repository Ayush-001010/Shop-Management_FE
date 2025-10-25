import React from "react";
import type IBoardHeader from "./IBoardHeader";
import styles from "../Board.module.css";
import { Popover } from "antd";
import BoardQuerying from "../BoardQuerying/BoardQuerying";
import { useGetDashboardContextValue } from "../../Dashboard";

const BoardHeader: React.FC<IBoardHeader> = ({ data }) => {
    const { boardHeaders } = useGetDashboardContextValue();

    const genrateCircleIcon = (color: "black" | "green" | "yellow" | "red" | "orange") => {
        let hexColor = "";
        switch (color) {
            case "black": {
                hexColor = "#212529";
                break;
            }
            case "red": {
                hexColor = "#9d0208";
                break;
            }
            case "yellow": {
                hexColor = "#b69121"
                break;
            }
            case "green": {
                hexColor = "#52b788";
                break;
            }
            case "orange": {
                hexColor = "#bc6c25";
                break;
            }
        }
        return <p style={{ backgroundColor: hexColor }} className="mb-0 rounded-full w-2 h-2 mr-1"></p>
    }
    return (
        <div>
            <div className="flex justify-start">
                {boardHeaders.map((header, index) => {
                    if (!header.value) return;
                    const { title, color } = header;
                    return (
                        <div className={`w-sm p-1 mr-5 flex justify-between rounded-lg ${styles.headerContainerCss}`}>
                            <div className="flex justify-center items-center ml-2">
                                {genrateCircleIcon(color)}
                                <p className={`mb-0  ${styles.headerColor}`}>
                                    {title}
                                    <span className={`${styles.headerNumberCss} ml-1 text-sm`}>{data[index].length}</span>
                                </p>
                            </div>
                            <div className="flex justify-center items-center">
                                <Popover trigger="click" content={<BoardQuerying header={title}  />} >
                                    <p className={`mb-0 mr-2 rounded-lg w-10 flex justify-center items-center ${styles.settingIconColor}`}>
                                        <i className="bi bi-three-dots" />
                                    </p>
                                </Popover>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default BoardHeader;