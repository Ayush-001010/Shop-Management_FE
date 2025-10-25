import React from "react";
import type IReview from "./IReview";
import { Button } from "antd";

const Review: React.FC<IReview> = () => {
    return (
        <div>
            <p>Are you sure</p>
            <Button>yes</Button>
        </div>
    )
};

export default Review