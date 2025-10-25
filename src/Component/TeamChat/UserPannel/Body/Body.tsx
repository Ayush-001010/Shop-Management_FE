import React from "react";
import type IBody from "./IBody";
import MessageGroup from "./MessageGroup/MessageGroup";
import PinnedGroup from "./PinnedGroup/PinnedGroup";

const Body: React.FC<IBody> = () => {
    return (
        <div className="h-140 overflow-auto">
            <PinnedGroup />
            <MessageGroup />
        </div>
    )
};

export default Body;