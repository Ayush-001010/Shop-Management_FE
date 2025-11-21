import React from "react";
import type IDotSpinerLoader from "./IDotSpinerLoader";

const DotSpinerLoader: React.FC<IDotSpinerLoader> = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="relative animate-spin h-8 w-8">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#ced4da] rounded-full"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#ced4da] rounded-full"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#ced4da] rounded-full"></div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#ced4da] rounded-full"></div>
            </div>
        </div>
    )
};

export default DotSpinerLoader;