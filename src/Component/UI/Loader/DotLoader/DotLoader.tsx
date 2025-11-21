import React from "react";
import type IDotLoader from "./IDotLoader";

const DotLoader: React.FC<IDotLoader> = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex space-x-2">
                <div className="w-2 h-2 bg-[#adb5bd] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#adb5bd] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-[#adb5bd] rounded-full animate-bounce [animation-delay:-0.6s]"></div>
            </div>
        </div>
    )
};

export default DotLoader;