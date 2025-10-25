import { useSelector } from "react-redux";
import APICallingServices from "../APICallingService";
import { useEffect, useState } from "react";
import type { IAnalyticsDataInterface } from "../Interface/AnalyticsInterface";
import CommonConfig from "../Config/CommonConfig";

const useInventoryDashboardAction = () => {
    const { user } = useSelector((state: any) => state);
    const [analyticsData, setAnalyticsData] = useState<Array<IAnalyticsDataInterface>>([]);
    const [cardValue, setCardValue] = useState<{ NoOfShops: number, NoOfProductType: number }>({ NoOfProductType: 0, NoOfShops: 0 });
    const [shopDetails, setShopDetails] = useState<Array<any>>([]);

    const getAnalytics = async (type: "Inventory Request" | "Amount Profit" | "Total Sales" | "Profit" | "Loss") => {
        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/inventory/GetAnalytics", { type, organizationID: user.orgnizationDetails.organizationID });
        if (response.success) {
            const { data } = response;
            const arr: Array<IAnalyticsDataInterface> = data.map((item: any) => {
                return {
                    title: `${CommonConfig.monthConfig[item.Month]}'${item.year.split("20")[1]}`,
                    value: item.value
                }
            });
            setAnalyticsData(arr);
        }
    };
    const getCardValue = async () => {
        const apiObj = new APICallingServices();
        const response1 = await apiObj.getDataFromBackend("/inventory/getCardValue", { type: "NoOfShops", organizationID: user.orgnizationDetails.organizationID });
        if (response1.success) {
            const response2 = await apiObj.getDataFromBackend("/inventory/getCardValue", { type: "NoOfProductCategory", organizationID: user.orgnizationDetails.organizationID });
            if (response2.success) {
                setCardValue({ NoOfShops: response1.data, NoOfProductType: response2.data });
            }
        }
    };
    const searchHandlerOfShopDetails = (searchStr: string) => {
        const allShopDetails: Array<any> = user.shopDetails || [];
        const searchItems = allShopDetails.filter((item) => {
            let isFlag = false;
            for (const key in item) {
                let str: any = item[key];
                if (typeof str !== "string" && str) {
                    str = str.toString();
                }
                if (str && str.includes(searchStr)) {
                    isFlag = true;
                }
            }
            return isFlag;
        });
        setShopDetails(searchItems);
    };
    const clearHandler = () => {
        setShopDetails(user.shopDetails || []);
    };
    const filterHandler = (filterValue: Record<string, string>) => {
        const allShopDetails: Array<any> = user.shopDetails || [];
        const selectedDetails = allShopDetails.filter((item: any) => {
            let isFlag = false;
            if ((!("shopname" in filterValue) || !filterValue["shopname"] || item["shopname"] === filterValue["shopname"]) && (!("shoptype" in filterValue) || !filterValue["shoptype"] || item["shoptype"] === filterValue["shoptype"])) {
                isFlag = true;
            }
            return isFlag;
        })
        setShopDetails(selectedDetails);
    }
    useEffect(() => {
        if (user.orgnizationDetails !== null && user.orgnizationDetails.organizationName !== null) {
            getAnalytics("Inventory Request");
            getCardValue();
        }
        setShopDetails(user.shopDetails || []);
    }, [user])
    return { analyticsData, getAnalytics, cardValue, shopDetails, searchHandlerOfShopDetails, clearHandler, filterHandler };
};

export default useInventoryDashboardAction;