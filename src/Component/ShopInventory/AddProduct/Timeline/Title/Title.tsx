import React, { type PropsWithChildren } from "react";
import type ITitle from "./ITitle";

const Title: React.FC<ITitle & PropsWithChildren> = ({ children }) => {
    return (
        <div className="w-20 ml-1 flex justify-center items-center text-center h-10">
        <p className="text-sm whitespace-normal break-words font-medium m-0">{children}</p>
      </div>
      
    )
};

export default Title;