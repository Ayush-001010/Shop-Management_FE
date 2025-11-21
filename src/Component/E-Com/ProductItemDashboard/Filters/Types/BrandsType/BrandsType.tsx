import React, { useEffect, useState } from "react";
import type IBrandType from "./IBrandType";
import useProjectItemDashboardAction from "../../../../../../Services/CustomHook/useProjectItemDashboardAction";
import Header from "../../Header/Header";
import DotLoader from "../../../../../UI/Loader/DotLoader/DotLoader";
import { Checkbox } from "antd";

const BrandType: React.FC<IBrandType> = () => {
    const { getFilterItems } = useProjectItemDashboardAction();
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
        <div>
            <Header text="Brand" />
            {isLoading && <DotLoader />}
            { !isLoading && brands?.map((brand: string) => (
                <div>
                    <Checkbox value={value.includes(brand)} onChange={(e) => changeHandler(e.target.checked, brand)} />
                    <p>{brand}</p>
                </div>
            ))}
        </div>
    )
};

export default BrandType;