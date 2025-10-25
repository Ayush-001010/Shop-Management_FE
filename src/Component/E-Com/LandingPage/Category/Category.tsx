import React, { useEffect, useState } from "react";
import type ICategory from "./ICategory";
import { useGetEcomContext } from "../../E-Com";
import CircularUI from "./CircularUI/CircularUI";
import RectangularUI from "./RectangularUI/RectangularUI";

const Category: React.FC<ICategory> = ({ UIType }) => {
    const { getCategoryAndSubCategoryForLandingPage } = useGetEcomContext();
    const [categorys, setCategorys] = useState<Array<{ Category: string, ImageURL: string }>>([]);

    useEffect(() => {
        getCategoryAndSubCategoryForLandingPage("Category").then((response) => {
            console.log("Response   ", response);
            setCategorys(response.data);
        })
    }, [])
    return (
        <div className="h-[250px] w-full flex">
            {categorys.map(category => {
                switch (UIType) {
                    case "Circular": return <CircularUI Category={category.Category} ImageURL={category.ImageURL} />
                    case "Rectangular": return <RectangularUI Category={category.Category} ImageURL={category.ImageURL} />
                }
            })}
        </div>
    )
};

export default Category;