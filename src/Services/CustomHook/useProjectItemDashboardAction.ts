import { useLocation, useParams } from "react-router-dom";
import APICallingServices from "../APICallingService";

const useProjectItemDashboardAction = () => {
    const { ShopId, Category } = useParams();
    const path = useLocation().pathname;

    const getFilterItems = async (type: "section" | "Category_Price_Range" | "Category_BrandNames" | "Category_SubCategory") => {
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
    };

    return { getFilterItems };
};

export default useProjectItemDashboardAction;