import React from "react";
import type IReview from "./IReview";
import { Button } from "antd";
import styles from "../AddContainer.module.css";

const Review: React.FC<IReview> = ({ submitHandler, closeReviewFunc }) => {
    return (
        <div className="mt-10">
            <div className="flex justify-center items-center">
                <p className="m-0 font-bold text-lg text-[#212529]">Do you want to proceed with creating this container?</p>
            </div>
            <div className="flex justify-around mt-3">
                <Button className={`w-40 ${styles.NoButtonCSS}`} onClick={closeReviewFunc}>No</Button>
                <Button className={`w-40 ${styles.YesButtonCSS}`} onClick={submitHandler}>Yes</Button>
            </div>
        </div>
    )
};

export default Review;