import React, { createContext, useContext } from "react";
import type IECom from "./IE-Com";
import Layout from "./Layout/Layout";
import useEComAction from "../../Services/CustomHook/useEComAction";
import { message, Select } from "antd";
import LandingPage from "./LandingPage/LandingPage";

interface IEComContext {
    getCategoryAndSubCategoryForLandingPage: (type: "Category" | "SubCategory") => Promise<{ success: boolean, data?: any }>;
    getSubCategoryItem: (Category: string, SubCategory: string) => Promise<{ success: boolean, data?: any }>;
    currentShopID: number | null;
};

const EComContext = createContext<IEComContext | undefined>(undefined);


export const useGetEcomContext = () => {
    const context = useContext(EComContext);
    if (!context) {
        throw new Error("useGetProfileSettingContext must be used within a ProfileSettingProvider");
    }
    return context;
}


const ECom: React.FC<IECom> = () => {
    const [messageAPI, contextHandler] = message.useMessage();
    const { shopNameOpt, islayoutExist, currentShop, changeHandlerForShopSelect, getCategoryAndSubCategoryForLandingPage, getSubCategoryItem } = useEComAction(messageAPI);

    return (
        <EComContext.Provider value={{ getCategoryAndSubCategoryForLandingPage, getSubCategoryItem, currentShopID: currentShop }} >
            <div className="w-full h-screen">
                {contextHandler}
                <div className="flex justify-end">
                    <Select className="mx-2 w-40" options={shopNameOpt} value={currentShop} onChange={changeHandlerForShopSelect} />
                </div>
                {islayoutExist === false && <Layout />}
                {islayoutExist && <LandingPage />}
            </div>
        </EComContext.Provider>
    )
};

export default ECom;