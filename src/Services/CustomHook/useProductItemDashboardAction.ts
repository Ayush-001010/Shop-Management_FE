import { useLocation, useParams } from "react-router-dom";
import APICallingServices from "../APICallingService";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItemSchema } from "../../Redux/ECom";

const useProductItemDashboardAction = () => {
    const { ShopId, Category } = useParams();
    const path = useLocation().pathname;
    const { itemSchema } = useSelector((state: any) => state.ecom);
    const dispatch = useDispatch();

    const getFilterItems = useCallback(async (type: "section" | "Category_Price_Range" | "Category_BrandNames" | "Category_SubCategory") => {
        const apiObj = new APICallingServices();
        switch (type) {
            case "section": {
                if (path.includes("Category")) {
                    const response = await apiObj.getDataFromBackend("/ecom/getFilterItems", { type: "Category_Section", ShopId, Category });
                    return response;
                }
                return { success: false };
            }
            case "Category_Price_Range": {
                if (path.includes("Category")) {
                    const response = await apiObj.getDataFromBackend("/ecom/getFilterItems", { type: "Category_Price_Range", ShopId, Category });
                    return response;
                }
                return { success: false };
            }
            case "Category_BrandNames": {
                if (path.includes("Category")) {
                    const response = await apiObj.getDataFromBackend("/ecom/getFilterItems", { type: "Category_BrandNames", ShopId, Category });
                    return response;
                }
                return { success: false };
            }
            case "Category_SubCategory": {
                if (path.includes("Category")) {
                    const response = await apiObj.getDataFromBackend("/ecom/getFilterItems", { type: "Category_SubCategory", ShopId, Category });
                    return response;
                }
                return { success: false };
            }
        }
    }, [ShopId, Category, path]);
    const getItems = useCallback(async (pageNo: number) => {
        // getItemSchema
        const apiObj = new APICallingServices();
        if (!itemSchema) {
            const response = await apiObj.getDataFromBackend("/ecom/getItemSchema", { ShopId });
            if (response.success) {
                dispatch(setItemSchema({ itemSchema: { UIType: response.data } }));
            }
        }
        if (path.includes("Category")) {
            const response = await apiObj.getDataFromBackend("/ecom/getItems", { ShopId, Category, pageNo, type: "Category_Items" });
            return response;
        }
        return { success: false };
    }, [ShopId, Category, path]);

    return { getFilterItems, getItems };
};

export default useProductItemDashboardAction;