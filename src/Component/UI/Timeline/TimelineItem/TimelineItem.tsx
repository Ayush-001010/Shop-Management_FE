import React from "react";
import type ITimelineItem from "./ITimelineItem";
import styles from "./TimelineItem.module.css";

const TimelineItem: React.FunctionComponent<ITimelineItem> = ({ item, stepNumber, currentTimelineIndex, editClickHandler }) => {
    const { title, description, isEditTextRequired } = item;

    const editClickHandlerFunc = () => {
        if (currentTimelineIndex >= stepNumber && editClickHandler) {
            editClickHandler(stepNumber - 1);
        }
    }
    return (
        <div className={`container flex flex-row px-2 ${styles.timeItemDivCss} `}>
            <div className="flex flex-col justify-center items-center">
                <h1 className={`w-10 h-10 flex flex-row justify-center place-items-center ${styles.stepNumberCss} ${currentTimelineIndex >= stepNumber ? "border-black border-2 text-black font-bold" : ""}`}>{stepNumber}</h1>
            </div>
            <div className="flex flex-col px-3">
                <h2 className={`${styles.headerCss}`}>{title}</h2>
                <p className={`text-xs w-60 ${styles.textCss}`}>{description}
                    <span className={`text-xs px-1 ${styles.editTextCss} ${styles[currentTimelineIndex >= stepNumber ? "activeEditClick" : "disabledEditClick"]}`} onClick={editClickHandlerFunc}>{isEditTextRequired ? "Edit" : ""}</span>
                </p>
            </div>
        </div>
    )
}

export default TimelineItem;