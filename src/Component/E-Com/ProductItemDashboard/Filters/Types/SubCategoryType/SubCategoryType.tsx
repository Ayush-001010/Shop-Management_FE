import React, { useEffect, useState } from "react";
import type ISubCategoryType from "./ISubCategoryType";
import Header from "../../Header/Header";
import DotLoader from "../../../../../UI/Loader/DotLoader/DotLoader";
import { Checkbox } from "antd";
import useProductItemDashboardAction from "../../../../../../Services/CustomHook/useProductItemDashboardAction";

const SubCategoryType: React.FC<ISubCategoryType> = () => {
    const { getFilterItems } = useProductItemDashboardAction();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [subCategories, setSubCategories] = useState<Array<string>>([]);
    const [value, setValue] = useState<Array<string>>([]);

    const changeHandler = (checkedValue: boolean, subCategoryName: string) => {
        if (checkedValue) {
            setValue([...value, subCategoryName]);
        } else {
            setValue(value.filter((subCategory: string) => subCategory !== subCategoryName));
        }
    }
    useEffect(() => {
        setIsLoading(true);
        getFilterItems("Category_SubCategory").then((response: { success: boolean, data?: any }) => {
            if (response.success) {
                setSubCategories(response.data || []);
                setIsLoading(false);
            }
        })
    }, [])
    return (
        <div className="my-1">
            <Header text="Sub Category" />
            {isLoading && <DotLoader />}
            <div className="p-2">
                {!isLoading && subCategories.map((subCategory: string) => (
                    <div className="flex">
                        <Checkbox value={value.includes(subCategory)} onChange={(e) => changeHandler(e.target.checked, subCategory)} />
                        <p className="text-center mx-2 my-0 font-medium text-[#495057]">{subCategory}</p>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default SubCategoryType;