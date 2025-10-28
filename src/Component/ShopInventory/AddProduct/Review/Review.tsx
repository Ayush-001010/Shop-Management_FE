import React from "react";
import type IReview from "./IReview";
import { Button } from "antd";

const Review: React.FC<IReview> = ({ submitHandler }) => {
    return (
        <div className="flex flex-col items-center justify-center p-6  max-w-sm mx-auto">
            <p className="text-lg font-medium text-gray-800 mb-4 text-center">Are you sure?</p>
            <div className="flex gap-4">
                <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded">
                    No
                </Button>
                <Button type="primary" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={submitHandler}>
                    Yes
                </Button>
            </div>
        </div>
    );
};

export default Review;
