import { useDispatch, useSelector } from "react-redux";
import type { IOptionsInterface } from "../Interface/CommonInterface";
import type IShopDetailsInterface from "../Interface/ShopDetailsInterface";
import APICallingServices from "../APICallingService";
import type IOrganizationDetailsInterface from "../Interface/OrganizationDetailsInterface";
import { useCallback, useEffect, useState } from "react";
import type { MessageInstance } from "antd/es/message/interface";
import CommonConfig from "../Config/CommonConfig";
import { setLayoutSchema, setReduxState } from "../../Redux/ECom";
import type { IItemLayoutItemface } from "../Interface/LayoutInterface";
import type ISectionLayoutInterface from "../Interface/LayoutInterface";

const useEComAction = (messageAPI: MessageInstance) => {
    const shopDetails: Array<IShopDetailsInterface> = useSelector((state: any) => state.user.shopDetails);
    const orgnizationDetails: IOrganizationDetailsInterface = useSelector((state: any) => state.user.orgnizationDetails);
    const [shopNameOpt, setShopNameOpt] = useState<Array<IOptionsInterface>>([]);
    const [islayoutExist, setIsLayoutExist] = useState<boolean | undefined>(undefined);
    const [currentShop, setCurrentShop] = useState<number | null>(null);
    const dispatch = useDispatch();

    const changeHandlerForShopSelect = useCallback((value: number) => {
        setCurrentShop(value);
    }, []);
    const getShopNameOptions = useCallback(() => {
        const options: Array<IOptionsInterface> | null = shopDetails?.map((shop: IShopDetailsInterface) => {
            return { label: shop.shopname, value: shop.ID };
        });

        return options || [];
    }, [shopDetails]);
    const checkLayoutAlreadyExists = useCallback(async (): Promise<boolean> => {
        try {
            const apiObj = new APICallingServices();
            const response = await apiObj.getDataFromBackend("/layout/checkLayoutIsAlreadyPresent", { organizationId: orgnizationDetails?.organizationID, shopId: currentShop });
            if (response.success) {
                setIsLayoutExist(response.data);
                return response.data;
            } else {
                setIsLayoutExist(undefined);
                return false;
            }
        } catch (error) {
            console.error("Error checking layout existence:", error);
            setIsLayoutExist(undefined);
            return false;
        }
    }, [orgnizationDetails, shopDetails, currentShop]);
    const getSectionSchemaAndItemSchema = useCallback(async (): Promise<void> => {
        try {
            const apiObj = new APICallingServices();
            const response = await apiObj.getDataFromBackend("/layout/getSectionSchemaAndItemSchema", { OrganizationID: orgnizationDetails.organizationID, ShopID: currentShop });
            if (response.success) {
                const { data } = response;
                const { sectionSchema, itemSchema } = data;
                const sectionSchemaArr: Array<ISectionLayoutInterface> = [];
                for (const section of sectionSchema) {
                    const baseImageURLs: Array<string> | undefined = section?.ImageURLs?.split("||");
                    const imageURLs: Array<string> = [];
                    if (baseImageURLs && baseImageURLs.length > 0) {
                        for (const baseImageURL of baseImageURLs) {
                            const response1 = await apiObj.getDataFromBackend("/ecom/getImageURL", {
                                baseURL: baseImageURL
                            })
                            if (response1.success) {
                                imageURLs.push(response1.data);
                            }
                        }
                    }
                    const obj: ISectionLayoutInterface = {
                        Category: section?.Category?.split("||"),
                        Discount: section?.Discount?.split("||"),
                        CategoryUIType: section?.CategoryUIType,
                        ImageURLs: imageURLs,
                        RedirectLink: section?.RedirectLink?.split("||"),
                        SectionType: section?.SectionType,
                        SubCategory: section?.SubCategory
                    };
                    sectionSchemaArr.push(obj);
                };
                const itemSchemaObj: IItemLayoutItemface = {
                    UIType: itemSchema?.ItemUIType
                }
                dispatch(setLayoutSchema({
                    sectionSchema: sectionSchemaArr,
                    itemSchema: itemSchemaObj
                }))
            }
        } catch (error) {
            console.log("Error ", error);
        }
    }, [orgnizationDetails, shopDetails, currentShop]);
    const getCategoryAndSubCategoryForLandingPage = async (type: "Category" | "SubCategory"): Promise<{ success: boolean, data?: any }> => {
        switch (type) {
            case "Category": {
                const apiObj = new APICallingServices();
                const response = apiObj.getDataFromBackend("/ecom/getCategoryAndSubCategoryForLandingPage");
                return response;
            }
        }
        return { success: false };
    }
    const getSubCategoryItem = useCallback(async (Category: string, SubCategory: string) => {
        try {
            const apiObj = new APICallingServices();
            const response = await apiObj.getDataFromBackend("/ecom/getSubCateegoryItem", { Category, SubCategory, shopID: currentShop , pageNo : 0});
            return response;
        } catch (error) {
            console.log("Error  ", error);
            return { success: false }
        }
    }, [currentShop])

    useEffect(() => {
        const options = getShopNameOptions();
        setShopNameOpt(options);
        if (options.length > 0) {
            setCurrentShop(options[0].value);
        }
    }, [shopDetails]);
    useEffect(() => {
        const obj = setTimeout(async () => {
            if (currentShop) {
                messageAPI.loading(CommonConfig.loadingMessage, 0);
                const response = await checkLayoutAlreadyExists();
                messageAPI.destroy();
                if (response) {
                    getSectionSchemaAndItemSchema();
                }
                dispatch(setReduxState({ isLayoutExist: response, currentShopID: currentShop }));
            }
        }, 200);
        return () => clearTimeout(obj);
    }, [currentShop]);

    return { shopNameOpt, islayoutExist, currentShop, changeHandlerForShopSelect, getCategoryAndSubCategoryForLandingPage, getSubCategoryItem };
};

export default useEComAction;