import React, { useState } from "react";
import type INewArrivalType from "./INewArrivalType";
import Header from "../../Header/Header";
import { Radio } from "antd";

const NewArrivalType: React.FC<INewArrivalType> = () => {
    const [value, setValue] = useState<string>();

    const changeHandler = (event: any) => setValue(event.target.value);

    return (
        <div className="my-1">
            <Header text="New Arrival" />
            <div className="p-2">
                <Radio.Group style={{ display: "flex", flexDirection: "column" }} onChange={changeHandler} value={value} options={[
                    { value: "15", label: <p className="text-center mx-2 my-0 font-medium text-[#495057]">Last 15 Days</p> },
                    { value: "30", label: <p className="text-center mx-2 my-0 font-medium text-[#495057]">Last 30 Days</p> },
                    { value: "60", label: <p className="text-center mx-2 my-0 font-medium text-[#495057]">Last 60 Days</p> },
                ]} />
            </div>
        </div>
    )
};

export default NewArrivalType;