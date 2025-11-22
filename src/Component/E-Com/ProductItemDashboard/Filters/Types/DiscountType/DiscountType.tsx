import React, { useState } from "react";
import type IDiscountType from "./IDiscountType";
import Header from "../../Header/Header";
import { Checkbox } from "antd";

const DiscountType: React.FC<IDiscountType> = () => {
    const [value, setValue] = useState<Array<string>>([]);

    const changeHandler = (checkedValue: boolean, discountValue: string) => {
        if (checkedValue) {
            setValue([...value, discountValue]);
        } else {
            setValue(value.filter((discount: string) => discount !== discountValue));
        }
    }

    return (
        <div className="my-1">
            <Header text="Discount" />
            <div className="p-2">
                <div className="flex">
                    <Checkbox onChange={(e) => changeHandler(e.target.checked, "10")} />
                    <p className="text-center mx-2 my-0 font-medium text-[#495057]">10%</p>
                </div>
                <div className="flex">
                    <Checkbox onChange={(e) => changeHandler(e.target.checked, "25")} />
                    <p className="text-center mx-2 my-0 font-medium text-[#495057]">25%</p>
                </div>
                <div className="flex">
                    <Checkbox onChange={(e) => changeHandler(e.target.checked, "50")} />
                    <p className="text-center mx-2 my-0 font-medium text-[#495057]">50%</p>
                </div>
                <div className="flex">
                    <Checkbox onChange={(e) => changeHandler(e.target.checked, "75")} />
                    <p className="text-center mx-2 my-0 font-medium text-[#495057]">75%</p>
                </div>
            </div>
        </div>
    )
};

export default DiscountType;