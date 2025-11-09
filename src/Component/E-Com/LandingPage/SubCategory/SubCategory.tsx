import React, { useEffect, useState } from "react";
import type ISubCategory from "./ISubCategory";
import { useGetEcomContext } from "../../E-Com";
import { useSelector } from "react-redux";
import type { IEcomReduxState } from "../../../../Redux/ECom";
import type { IItemInterface } from "../../../../Services/Interface/EComInterface";
import ItemStyle3 from "../../UI/ItemStyle3";

const SubCategory: React.FC<ISubCategory> = ({ SubCategory, Category }) => {
    const { getSubCategoryItem } = useGetEcomContext();
    const [items, setItems] = useState<Array<IItemInterface>>([]);
    const { itemSchema }: IEcomReduxState = useSelector((state: any) => state.ecom);

    useEffect(() => {
        getSubCategoryItem(Category, SubCategory).then((response) => {
            console.log("Response   ", response);
            const arr: Array<IItemInterface> = [];
            for (const data of response.data) {
                data.ProductImagesURL = data.ImageURLs;
                arr.push(data);
            }
            setItems(arr);
        })
    }, []);

    console.log("Item Schema    ", items , itemSchema?.UIType);

    return (
        <div className="h-auto p-1">
            <div>
                <p className="text-lg text-[#212529] font-semibold">{SubCategory}</p>
            </div>
            <div className="w-full flex overflow-x-auto">
                {items.map((item: IItemInterface) => {
                    switch (itemSchema?.UIType) {
                        case "Style 3": return <ItemStyle3 data={item} />
                    }
                    return <></>
                })}
            </div>
        </div>
    )
};

export default SubCategory;