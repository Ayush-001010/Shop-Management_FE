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
        <div>
            <Header text="Discount" />
            <div>
                <div>
                    <Checkbox onChange={(e) => changeHandler(e.target.checked, "10")} />
                    <p>10%</p>
                </div>

                <div>
                    <Checkbox onChange={(e) => changeHandler(e.target.checked, "25")} />
                    <p>25%</p>
                </div>

                <div>
                    <Checkbox onChange={(e) => changeHandler(e.target.checked, "50")} />
                    <p>50%</p>
                </div>

                <div>
                    <Checkbox onChange={(e) => changeHandler(e.target.checked, "75")} />
                    <p>75%</p>
                </div>
            </div>
        </div>
    )
};

export default DiscountType;