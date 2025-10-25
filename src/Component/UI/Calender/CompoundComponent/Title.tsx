import React from "react";
import  { useCalenderContext } from "../Calender";

const Title : React.FC<{}> = () => {
    const { title } = useCalenderContext();
    return (
        <div >
            <p className="text-lg font-bold">{title}</p>
        </div>
    )
};

export default Title;