import React, { useEffect, useState } from "react";
import type ILandingPage from "./ILandingPage";
import { useSelector } from "react-redux";
import type { IEcomReduxState } from "../../../Redux/ECom";
import type ISectionLayoutInterface from "../../../Services/Interface/LayoutInterface";
import Banners from "./Banners/Banners";
import Category from "./Category/Category";
import SubCategory from "./SubCategory/SubCategory";
import Items from "./Items/Items";
import TopSection from "./TopSection/TopSection";

const LandingPage: React.FC<ILandingPage> = () => {
    const { sectionSchema }: IEcomReduxState = useSelector((state: any) => state.ecom);
    const [sections, setSections] = useState<Array<ISectionLayoutInterface>>([]);

    const handelInfiniteScroll = async () => {
        // console.log("scrollHeight : " + document.documentElement.scrollHeight); // Total Height.
        // console.log("innerHeight : " + window.innerHeight); // Current Window Height.
        // console.log("scrollTop : " + document.documentElement.scrollTop); // Total Pixel scroll. 
        // console.log("");
        try {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >=
                document.documentElement.scrollHeight
            ) {
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handelInfiniteScroll);
        return () => window.removeEventListener("scroll", handelInfiniteScroll);
    }, []);
    useEffect(() => {
        const totalCurrentViewPortHeight: number = window.innerHeight;
        // console.log(" Total Current View Port Height !! ", totalCurrentViewPortHeight);
        if (sectionSchema) {
            let currentHeightOfSection = 0;
            const currentSectionViewArray: Array<ISectionLayoutInterface> = [];
            for (const section of sectionSchema) {
                switch (section.SectionType) {
                    case "Banner": {
                        currentHeightOfSection += 400;
                        break;
                    }
                    case "Category": {
                        currentHeightOfSection += 250;
                        break;
                    }
                    case "Category-Items": {
                        currentHeightOfSection += 250;
                        break;
                    }
                    case "Sub-Category": {
                        currentHeightOfSection += 250;
                        break;
                    }
                    case "Items": {
                        currentHeightOfSection += 250;
                        break;
                    }
                }
                currentSectionViewArray.push(section);
                if (currentHeightOfSection > totalCurrentViewPortHeight) {
                    break;
                }
            }
            // console.log("Current Height of Section  ", currentHeightOfSection, "    ", currentSectionViewArray, "   ", sectionSchema)
            setSections( sectionSchema || []);
        }
    }, [sectionSchema]);

    return (
        <div>
            <TopSection />
            {sections?.map((section: ISectionLayoutInterface) => {
                switch (section.SectionType) {
                    case "Banner": {
                        return <Banners imageURLs={section.ImageURLs || []} />
                    }
                    case "Category": {
                        return <Category UIType={section.CategoryUIType || "Circular"} />
                    }
                    case "Sub-Category": {
                        return <SubCategory Category={(section?.Category && section?.Category?.length > 0) ? section?.Category[0] : ""} SubCategory={section.SubCategory || ""} />
                    }
                    case "Items": {
                        return <Items />
                    }
                    default: return null;
                }
            })}
        </div>
    )
};

export default LandingPage;