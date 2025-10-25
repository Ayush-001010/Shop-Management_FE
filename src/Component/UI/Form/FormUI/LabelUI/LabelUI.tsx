import React, { type PropsWithChildren } from "react";
import type ILabelUI from "./ILabelUI";

const LabelUI : React.FunctionComponent<ILabelUI & PropsWithChildren> = ({children}) => {
    return (
        <label className="text-base font-light w-70 " >
            {children}
        </label>
    )
};

export default LabelUI;