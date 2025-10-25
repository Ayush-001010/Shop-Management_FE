import React from "react";
import type { IErrorUI } from "./IErrorUI";

const ErrorUI: React.FunctionComponent<IErrorUI> = ({ error }) => {
    return (
        <p className="text-xs text-red-800 h-1">{error}</p>
    )
};

export default ErrorUI;