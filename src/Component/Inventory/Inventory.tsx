import React from "react";
import type IInventory from "./IInventory";
import { motion } from "framer-motion";
import Header from "./Header/Header";
import Analytics from "../UI/Analytics/Analytics";
import InventoryDashboardConfig from "../../Services/Config/InventoryDashboardConfig";
import useInventoryDashboardAction from "../../Services/CustomHook/useInventoryDashboardAction";
import TextCard from "../UI/Card/TextCard/TextCard";
import Dashboard from "../UI/Dashboard/Dashboard";

const Inventory: React.FC<IInventory> = () => {
    const { analyticsData, getAnalytics, cardValue, shopDetails, searchHandlerOfShopDetails, clearHandler, filterHandler } = useInventoryDashboardAction();

    const analyticTypeChangeHandler = (newValue: string) => {
        getAnalytics(newValue as "Inventory Request" | "Amount Profit" | "Total Sales" | "Profit" | "Loss");
    }
    const searchHandler = (searchValue: string) => {
        searchHandlerOfShopDetails(searchValue);
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <Header />
            <div className="w-full flex">
                <div className="w-7xl">
                    <Analytics analyticTypeChange={analyticTypeChangeHandler} analyticsOption={InventoryDashboardConfig.analyticsOption} defaultValue={"Inventory Request"} data={analyticsData} >
                        <Analytics.Option />
                    </Analytics>
                </div>
                <div className="w-60 h-70">
                    <TextCard value={cardValue.NoOfShops} title="Number Of Shops"/>
                    <TextCard value={cardValue.NoOfProductType} title="Number Of Product" />
                </div>
            </div>
            <div>
                <Dashboard tableConfig={InventoryDashboardConfig.columnConfig} allData={shopDetails || []} tablePropertiesArr={InventoryDashboardConfig.properties} searchHandler={searchHandler} clearHandler={clearHandler} tableFilterConfig={InventoryDashboardConfig.filterConfig} applyHandlerOfFilterFunc={filterHandler} isGridViewNeed={true} boardCardType="inventoryDashboard">
                    <Dashboard.GridDashboardToogle />
                    <div className="flex justify-end">
                        <Dashboard.TableQuerying />
                        <Dashboard.Properties />
                        <Dashboard.BigTextModal />
                    </div>
                </Dashboard>
            </div>
        </motion.div>
    )
};

export default Inventory;