import React, { useEffect, useState } from "react";
import type ISubCategoryType from "./ISubCategoryType";
import useProjectItemDashboardAction from "../../../../../../Services/CustomHook/useProjectItemDashboardAction";
import Header from "../../Header/Header";
import DotLoader from "../../../../../UI/Loader/DotLoader/DotLoader";
import { Checkbox } from "antd";

const SubCategoryType: React.FC<ISubCategoryType> = () => {
    const { getFilterItems } = useProjectItemDashboardAction();
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
        <div>
            <Header text="Sub Category" />
            {isLoading && <DotLoader />}
            {!isLoading && subCategories.map((subCategory: string) => (
                <div>
                    <Checkbox value={value.includes(subCategory)} onChange={(e) => changeHandler(e.target.checked, subCategory)} />
                    <p>{subCategory}</p>
                </div>
            ))}
        </div>
    )
};

export default SubCategoryType;