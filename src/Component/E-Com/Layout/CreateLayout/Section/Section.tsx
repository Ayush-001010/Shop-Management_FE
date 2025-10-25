import React, { useState } from "react";
import type ISection from "./ISection";
import CreateLayoutConfig from "../../../../../Services/Config/CreateLayoutConfig";
import Header from "./Header/Header";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import SubCategory from "./SubCategory/SubCategory";
import CategoryItems from "./CategoryItems/CategoryItems";
import type ILayoutInterface from "../../../../../Services/Interface/CreateLayoutInterface";
import SectionWiseBar from "./SectionWiseBar/SectionWiseBar";
import SectionCard from "./SectionCard/SectionCard";
import type { IBannerTypeInterface } from "../../../../../Services/Interface/CreateLayoutInterface";
import { Button } from "antd";
import useMessage from "antd/es/message/useMessage";
import Item from "./Item/Item";
import useCreateLayoutAction from "../../../../../Services/CustomHook/useCreateLayoutAction";
import CommonConfig from "../../../../../Services/Config/CommonConfig";

const Section: React.FC<ISection> = () => {
    const [sectionType, setSectionType] = useState<"Banner" | "Category" | "Sub-Category" | "Category-Items" | "Items" | "" | "ItemUI">("");
    const [sectionDetails, setSectionDetails] = useState<Array<ILayoutInterface>>([]);
    const { addLayoutSections } = useCreateLayoutAction();
    const [messageAPI, contextHandler] = useMessage();

    const clickHandler = (option: "Banner" | "Category" | "Sub-Category" | "Category-Items" | "Items") => {
        setSectionType(option);
        if (option === "Items") {
            setSectionDetails((prevState: Array<ILayoutInterface>) => {
                const obj: ILayoutInterface = {
                    sectionType: "Items"
                };
                return [...prevState, obj];
            });
            setSectionType("");
        }
    }
    const backHandler = () => setSectionType("");
    const bannerSubmitHandler = (redirectLinkType: Array<IBannerTypeInterface>) => {
        setSectionDetails((prevState: Array<ILayoutInterface>) => {
            const obj: ILayoutInterface = {
                sectionType: "Banner",
                bannerInfo: redirectLinkType
            };
            return [...prevState, obj];
        });
        setSectionType("");
    }
    const categorySubmitHandler = (type: "Circular" | "Rectangular") => {
        setSectionDetails((prevState: Array<ILayoutInterface>) => {
            const obj: ILayoutInterface = {
                sectionType: "Category",
                categoryUIType: type
            };
            return [...prevState, obj];
        });
        setSectionType("");
    }
    const subCategorySubmitHandler = (value: { Category: string, SubCategory: string }) => {
        setSectionDetails((prevState: Array<ILayoutInterface>) => {
            const obj: ILayoutInterface = {
                sectionType: "Sub-Category",
                subCategoryType: value
            };
            return [...prevState, obj];
        });
        setSectionType("");
    }
    const categoryItemsSubmitHandler = (value: string) => {
        setSectionDetails((prevState: Array<ILayoutInterface>) => {
            const obj: ILayoutInterface = {
                sectionType: "Category-Items",
                itemsCategoryType: value
            };
            return [...prevState, obj];
        });
        setSectionType("");
    }
    const deleteSectionHandler = (index: number) => {
        setSectionDetails((prevState: Array<ILayoutInterface>) => {
            const arr1 = prevState.slice(0, index);
            const arr2 = prevState.slice(index + 1, prevState.length);
            return [...arr1, ...arr2];
        });
    }
    const nextHandler = () => {
        if (sectionDetails.length === 0) {
            messageAPI.error({ content: "Please add at least one section to proceed." });
            return;
        }
        setSectionType("ItemUI");
    }
    const submitHandler = async (value: "Style 1" | "Style 2" | "Style 3" | "Style 4") => {
        const sectionDetailsVal: Array<ILayoutInterface> = [
            ...sectionDetails,
            {
                sectionType: "ItemUI",
                itemUIStyle: value
            }
        ]
        messageAPI.loading(CommonConfig.loadingMessage, 0);
        const response = await addLayoutSections(sectionDetailsVal);
        messageAPI.destroy();
        if(response.success){
            setTimeout(()=>{
                location.reload();
            },500)
        } else {
            messageAPI.error({ content: "Failed to create layout sections. Please try again." });
        }
    }
    return (
        <div>
            {contextHandler}
            <SectionWiseBar deleteSectionHandler={deleteSectionHandler} data={sectionDetails} />
            {sectionType === "" && <>
                <Header />
                <div className="grid grid-cols-2 gap-2">
                    {CreateLayoutConfig.sectionOption.map(option => <SectionCard title={option.title} description={option.description} clickHandler={clickHandler} />)}
                </div>
                <div className="mt-2 flex justify-end">
                    <Button style={{ border: "none", boxShadow: "none", padding: "0", margin: "0" }} onClick={nextHandler}>
                        <p className="font-medium m-0 bg-[#343a40] rounded-lg shadow-sm p-2 text-white w-40">Next</p>
                    </Button>
                </div>
            </>
            }
            {sectionType === "Banner" && <Banner backHandler={backHandler} nextHandler={bannerSubmitHandler} />}
            {sectionType === "Category" && <Category backHandler={backHandler} nextHandler={categorySubmitHandler} />}
            {sectionType === "Sub-Category" && <SubCategory backHandler={backHandler} nextHandler={subCategorySubmitHandler} />}
            {sectionType === "Category-Items" && <CategoryItems backHandler={backHandler} nextHandler={categoryItemsSubmitHandler} />}
            {sectionType === "ItemUI" && <Item backHandler={backHandler} submitHandler={submitHandler} />}
        </div>
    )
};

export default Section;