import React, { useEffect, useState } from "react";
import type ISubCategory from "./ISubCategory";
import { useGetEcomContext } from "../../E-Com";

const SubCategory: React.FC<ISubCategory> = ({ SubCategory, Category }) => {
    const { getSubCategoryItem } = useGetEcomContext();
    const [items, setItems] = useState<Array<any>>([]);

    useEffect(() => {
        getSubCategoryItem(Category, SubCategory).then((response) => {
            if (response.success) {
                setItems(response.data);
            }
        })
    }, []);
    return (
        <div className="h-[250px]">
            {items.map((_) => (<div>
                <p>Hey !!</p>
            </div>))}
        </div>
    )
};

export default SubCategory;