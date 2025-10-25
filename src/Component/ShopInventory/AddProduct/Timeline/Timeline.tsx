import React, { useMemo } from "react";
import type ITimeline from "./ITimeline";
import { Steps } from "antd";
import Title from "./Title/Title";

const Timeline: React.FC<ITimeline> = ({ currentStep }) => {
    const stepItems = useMemo(() => {
        return [
            {
                title: <Title>Product Details</Title>
            },
            {
                title: <Title>Product Placement</Title>
            },
            {
                title: <Title>Review</Title>
            },
        ]
    }, []);
    return (
        <div>
            <Steps items={stepItems} current={currentStep} />
        </div>
    )
};

export default Timeline;