import React, {  useEffect, useRef, useState } from "react";
import type ICategory from "./ICategory";
import { useGetEcomContext } from "../../E-Com";
import CircularUI from "./CircularUI/CircularUI";
import RectangularUI from "./RectangularUI/RectangularUI";
import type { ICategoryItemInterface } from "../../../../Services/Interface/EComInterface";

const Category: React.FC<ICategory> = ({ UIType }) => {
    const { getCategoryAndSubCategoryForLandingPage } = useGetEcomContext();
    const [categorys, setCategorys] = useState<Array<ICategoryItemInterface>>([]);
    const [displayCategorys, setDisplayCategorys] = useState<Array<ICategoryItemInterface>>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getCategoryAndSubCategoryForLandingPage("Category").then((response) => {
            handelInfiniteScroll(response.data);
            setCategorys(response.data);
        });
    }, []);

    const handelInfiniteScroll = (categorys: Array<ICategoryItemInterface>) => {
        const container = scrollContainerRef.current;
        const width: number = 150;
        let w = 0 , index = 0;
        if (container) {
            const { scrollLeft, clientWidth } = container;
            const currentViewWidth = scrollLeft + clientWidth;
            // console.log("Scroll Left:", scrollLeft, "Scroll Width:", scrollWidth, "Client Width:", clientWidth, " Current Width ", currentViewWidth);
            const arr : Array<ICategoryItemInterface> = [];
            while(currentViewWidth >= w){
                if(categorys.length <= index) break;
                arr.push(categorys[index++]);
                w+=width;
            }
            // console.log("Display Category   ",arr , " Categorys ",categorys);
            setDisplayCategorys(arr);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener("scroll", () => handelInfiniteScroll(categorys));
        }
        return () => {
            if (container) {
                container.removeEventListener("scroll", () => handelInfiniteScroll(categorys));
            }
        };
    }, [categorys]);

    return (
        <div className=" mt-12">
            <div ref={scrollContainerRef} className="w-full flex overflow-x-auto">
                {displayCategorys.map((category, index) => {
                    switch (UIType) {
                        case "Circular":
                            return <CircularUI key={index} Category={category.Category} ImageURL={category.ImageURL} />;
                        case "Rectangular":
                            return <RectangularUI key={index} Category={category.Category} ImageURL={category.ImageURL} />;
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
};

export default Category;
