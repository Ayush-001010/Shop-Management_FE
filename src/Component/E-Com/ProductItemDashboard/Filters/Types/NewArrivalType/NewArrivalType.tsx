import React, { useState } from "react";
import type INewArrivalType from "./INewArrivalType";
import Header from "../../Header/Header";
import { Radio } from "antd";

const NewArrivalType: React.FC<INewArrivalType> = () => {
    const [value , setValue] = useState<string>();

    const changeHandler = (event : any) => setValue(event.target.value);

    return (
        <div>
            <Header text="New Arrival" />
            <Radio.Group onChange={changeHandler} value={value} options={[
                {value : "15", label: "Last 15 Days"},
                {value : "30", label: "Last 30 Days"},
                {value : "60", label: "Last 60 Days"},
            ]}/>
        </div>
    )
};

export default NewArrivalType;