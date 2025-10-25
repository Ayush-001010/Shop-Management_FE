import React from "react";
import type ITimeline from "./ITimeline";
import TimelineItem from "./TimelineItem/TimelineItem";
import styles from "./Timeline.module.css";

const Timeline: React.FunctionComponent<ITimeline> = ({ items, currentTimelineIndex, editClickHandler }) => {
    return (
        <div className={`w-sm ${styles.timelineContainer}`}>
            <div className="fixed">
                {items.map((item, index) => (
                    <>
                        <TimelineItem item={item} key={index} stepNumber={index + 1} currentTimelineIndex={currentTimelineIndex} editClickHandler={editClickHandler} />
                        {index < items.length - 1 && <p className={`mx-7 ${styles.lineCSS} ${currentTimelineIndex >= index + 1 ? "bg-black" : "" }`} />}
                    </>
                ))}
            </div>
        </div>
    )
};

export default Timeline;