import React, { useEffect, useState } from "react";
import type IBrandType from "./IBrandType";
import Header from "../../Header/Header";
import DotLoader from "../../../../../UI/Loader/DotLoader/DotLoader";
import { Checkbox } from "antd";
import useProductItemDashboardAction from "../../../../../../Services/CustomHook/useProductItemDashboardAction";

const BrandType: React.FC<IBrandType> = () => {
    const { getFilterItems } = useProductItemDashboardAction();
    const [brands, setBrands] = useState<Array<string>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [value, setValue] = useState<Array<string>>([]);

    const changeHandler = (checkedValue: boolean, brandName: string) => {
        if (checkedValue) {
            setValue([...value, brandName]);
        } else {
            setValue(value.filter((brand: string) => brand !== brandName));
        }
    }
    useEffect(() => {
        setIsLoading(true);
        getFilterItems("Category_BrandNames").then((response: { success: boolean, data?: any }) => {
            if (response.success) {
                setBrands(response.data || []);
                setIsLoading(false);
            }
        })
    }, [])
    return (
        <div className="my-1">
            <Header text="Brand" />
            {isLoading && <DotLoader />}
            <div className="p-2">
                {!isLoading && brands?.map((brand: string) => (
                    <div className="flex">
                        <Checkbox value={value.includes(brand)} onChange={(e) => changeHandler(e.target.checked, brand)} />
                        <p className="text-center mx-2 my-0 font-medium text-[#495057]">{brand}</p>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default BrandType;