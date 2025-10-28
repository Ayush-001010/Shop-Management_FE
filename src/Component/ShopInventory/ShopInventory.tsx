import React, { useEffect, useState } from "react";
import type IShopInventory from "./IShopInventory";
import AddContainer from "./AddContainer/AddContainer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type IShopDetailsInterface from "../../Services/Interface/ShopDetailsInterface";
import AddProduct from "./AddProduct/AddProduct";
import Header from "./Header/Header";
import HeaderButton from "./Header/HeaderButton/HeaderButton";
import Dashboard from "../UI/Dashboard/Dashboard";
import ShopInventoryConfig from "../../Services/Config/ShopInventoryConfig";
import useShopInventoryDashboardAction from "../../Services/CustomHook/useShopInventoryDashboardAction";
import useMessage from "antd/es/message/useMessage";
import CommonConfig from "../../Services/Config/CommonConfig";


const ShopInventory: React.FC<IShopInventory> = () => {
    const { id } = useParams();
    const [messageAPI, contextHandler] = useMessage();
    const { shopDetails } = useSelector((state: any) => state.user);
    const [shopDetail, setShopDetail] = useState<IShopDetailsInterface | null>(null);
    const [openAddContainerForm, setOpenAddContainerForm] = useState<boolean>(false);
    const [openAddProductForm, setOpenAddProductForm] = useState<boolean>(false);
    const { sellTrackingData, getDataHandler, addNoteFunc, notes, deleteNoteFunc, data, newContainerName, applyFilterHandler, searchHandler } = useShopInventoryDashboardAction();

    const openAddProductFormFunc = () => setOpenAddProductForm(true);
    const closeAddProductFormFunc = () => setOpenAddProductForm(false);
    const openAddContainerFormFunc = () => setOpenAddContainerForm(true);
    const closeAddContainerForm = () => setOpenAddContainerForm(false);
    const takeSpecifyShopDetail = () => {
        const shop = shopDetails.filter((item: IShopDetailsInterface) => item.ID === Number(id));
        setShopDetail(shop[0]);
    }
    const addNotesHandler = async (newValue: string) => {
        const response = await addNoteFunc(newValue);
        if (response.success) {
            messageAPI.success({ content: "Your note has been saved." });
            return;
        } else {
            messageAPI.error(CommonConfig.errorMessage);
            return;
        }
    }
    const deleteNotesHandler = async (ID: number) => {
        const response = await deleteNoteFunc(ID);
        if (response.success) {
            messageAPI.success({ content: "Your note has been successfully delete." });
            return;
        } else {
            messageAPI.error(CommonConfig.errorMessage);
            return;
        }
    }
    const applyFilterHandlerFunc = async (value: Record<string, string>) => {
        messageAPI.destroy();
        messageAPI.loading(CommonConfig.loadingMessage);
        await applyFilterHandler(value);
        messageAPI.destroy();
        messageAPI.success({ content: "Successfully Applied!!" });
    }
    const getDataHandlerFunc = async () => {
        messageAPI.destroy();
        messageAPI.loading(CommonConfig.loadingMessage);
        await getDataHandler();
        messageAPI.destroy();
    }
    const searchHandlerFunc = async (val: string) => {
        messageAPI.destroy();
        messageAPI.loading(CommonConfig.loadingMessage);
        await searchHandler(val);
        messageAPI.destroy();
    }

    useEffect(() => {
        if (id && shopDetails) {
            takeSpecifyShopDetail();
        }
    }, [id, shopDetails])

    return (
        <div className="mt-3 p-3">
            {contextHandler}
            <div className="flex justify-between">
                <Header shopName={shopDetail?.shopname || ""} />
                <HeaderButton openAddProductFormFunc={openAddProductFormFunc} openAddContainerFormFunc={openAddContainerFormFunc} />
            </div>
            <AddContainer open={openAddContainerForm} closeHandler={closeAddContainerForm} newContainerName={newContainerName} />
            <AddProduct open={openAddProductForm} closeFunc={closeAddProductFormFunc} />
            <Dashboard tableFilterConfig={ShopInventoryConfig.tableFilters} searchHandler={searchHandlerFunc} tableConfig={ShopInventoryConfig.tableColumnConfig} tablePropertiesArr={ShopInventoryConfig.tableProperties} deleteNotesHandler={deleteNotesHandler} notes={notes} addNotes={addNotesHandler} sellTrackingData={sellTrackingData} allData={data} cardConfig={ShopInventoryConfig.cardConfig.slice(0, 5)} columnCardConfig={ShopInventoryConfig.cardConfig.slice(5)} applyHandlerOfFilterFunc={applyFilterHandlerFunc} clearHandler={getDataHandlerFunc}>
                <Dashboard.RowByRowCards />
                <div className="flex">
                    <Dashboard.SellTracking />
                    <Dashboard.Notes />
                    <Dashboard.ColumnByColumnCards />
                </div>
                <div className="flex justify-end">
                    <Dashboard.Properties />
                    <Dashboard.TableQuerying />
                </div>
                <Dashboard.BigTextModal />
            </Dashboard>
        </div>
    )
};

export default ShopInventory;