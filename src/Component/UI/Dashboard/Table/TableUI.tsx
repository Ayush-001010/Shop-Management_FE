import React, { useEffect, useState } from "react";
import type ITable from "./ITable";
import { Table, Tooltip } from "antd";
import { useGetDashboardContextValue } from "../Dashboard";
import type { ITableConfigInterface } from "../../../../Services/Interface/DashboardInterface";
import type ITableInterface from "../../../../Services/Interface/DashboardInterface";
import moment from "moment";
import RowDescription from "./RowDescription/RowDescription";
import styles from "./TableUI.module.css";
import InventoryConfig from "../../../../Services/Config/InventoryConfig";
import Confirmation from "../../Confirmation/Confirmation";
import { Link } from "react-router-dom";

const TableUI: React.FC<ITable> = () => {
    const { orginalConfig, data, changeHandlerStatusStepHandler, deleteHandlerFunc, changeHandlerBigTextModal, openEditFormHandler, setEditFormFieldsHandler, setEditFormInitialValuesHandler, setEditFormTitleHandler, customFunc } = useGetDashboardContextValue();
    const [columnsConfig, setColumnConfig] = useState<Array<ITableConfigInterface>>([]);
    const [tableExpandConfig, setTableExpandConfig] = useState<Array<ITableConfigInterface>>([]);
    const [pageSize, setPageSize] = useState(10);
    const [openConfirmationModule, setOpenConfirmationModule] = useState<boolean>(false);
    const [deleteID, setDeleteID] = useState<number>(0);

    const onConfirmationHandler = (decision: boolean) => {
        setOpenConfirmationModule(false);
        if (decision && deleteHandlerFunc) {
            deleteHandlerFunc(deleteID);
        }
    }
    const deleteHandler = (item: any) => {
        setOpenConfirmationModule(true);
        setDeleteID(item.ID);
    }
    const openOrderPlaceFormHandler = (item: any) => {
        item = { ...item, Status: "In-Progress" };
        openEditFormHandler();
        setEditFormFieldsHandler(InventoryConfig.newOrderPlaceFormConfig);
        setEditFormInitialValuesHandler(item);
        setEditFormTitleHandler("Edit Inventory Item");
    }
    const recivedOrderHandler = (item: any) => {
        if (customFunc) {
            customFunc(item.ID);
        }
    }
    const holdOrderHandler = (item: any) => {
        item = { ...item, Status: "Hold" };
        openEditFormHandler();
        setEditFormFieldsHandler(InventoryConfig.holdInventoryRequestFormConfig);
        setEditFormInitialValuesHandler(item);
        setEditFormTitleHandler("Hold Inventory Item");
    }
    const rejectOrderHandler = (item: any) => {
        item = { ...item, Status: "Rejected" };
        openEditFormHandler();
        setEditFormFieldsHandler(InventoryConfig.rejectInventoryRequestFormConfig);
        setEditFormInitialValuesHandler(item);
        setEditFormTitleHandler("Reject Inventory Item");
    }
    const dateRender = (_: any, record: any, backendName: string) => {
        return <div className="flex justify-center items-center">
            <p className="m-0">{!record[backendName] ? "" : moment(record[backendName]).format("DD/MM/YYYY")}</p>
        </div>
    }
    const bigTextHandleRender = (_: any, record: any, backendName: string, displayName: string) => {
        const str: string = record[backendName];
        return <div className="flex flex-start items-center">
            <p className={`text-sm m-0 ${styles.bigTextCss}`} onClick={() => changeHandlerBigTextModal({ open: true, text: str, propertyName: displayName })}>{str?.split(" ")?.splice(0, 5)?.join(" ")}{str ? "..." : ""}</p>
        </div>
    }
    const inventoryActionFunc = (_: any, record: any) => {
        const { Status } = record
        return (
            <p className="flex m-1">
                {Status !== "In-Progress" && <Tooltip title="Order Place" placement="top">
                    <span className={`p-1 m-1 rounded-lg ${styles.ActioniconCSS}`} onClick={() => openOrderPlaceFormHandler(record)}>
                        <i className="bi bi-pencil-square" />
                    </span>
                </Tooltip>
                }
                {Status !== "New" && <span className={`p-1 m-1 rounded-lg ${styles.ActioniconCSS}`} onClick={() => recivedOrderHandler(record)} >
                    <i className="bi bi-check-circle" />
                </span>}
                <span className={`p-1 m-1 rounded-lg ${styles.ActioniconCSS}`} onClick={() => holdOrderHandler(record)}>
                    <i className="bi bi-pause-circle" />
                </span>
                <span className={`p-1 m-1 rounded-lg ${styles.ActioniconCSS}`} onClick={() => rejectOrderHandler(record)} >
                    <i className="bi bi-x-circle-fill" />
                </span>
                {Status !== "In-Progress" && <span className={`p-1 m-1 rounded-lg ${styles.ActioniconCSS}`} onClick={() => deleteHandler(record)}>
                    <i className="bi bi-trash3-fill" />
                </span>}
            </p>
        )
    }
    const genrateRowExpandColumnsConfig = () => {
        const cols: Array<ITableConfigInterface> = [];
        orginalConfig.forEach((fields) => {
            const { backendName, displayName, isFormatter } = fields;
            if (isFormatter) return;
            cols.push({
                dataIndex: backendName,
                key: backendName,
                title: displayName,
            })
        });
        setTableExpandConfig(cols);
    }
    const inventoryStatusFunc = (_: any, record: any, backendName: string) => {
        return (
            <div className="flex justify-center items-center">
                <p className={`m-0 shadow-lg p-2 w-full text-center rounded-2xl font-semibold ${styles.statusTextCss}`} onClick={() => changeHandlerStatusStepHandler({ open: true, items: [{ title: "New" }, { title: "In-Progress" }, { title: "Completed" }], val: 0 })}>{record[backendName]}</p>
            </div>
        )
    }
    const redirectToShopDetailsFunc = (_: any, record: any) => {
        return <div className="flex justify-center items-center">
            <Link to={`/Inventory/${record.ID}`}>
                <p className="m-0 font-semibold">
                    <i className="font-bold text-black  text-lg bi bi-shop" />
                </p>
            </Link>
        </div>
    }
    const genrateColumnsConfig = () => {
        let col: Array<ITableConfigInterface> = [];
        orginalConfig.forEach((field: ITableInterface) => {
            const { backendName, displayName, isHideField, isDateField, isFormatter, formatterFuncName, isBigTextColumn } = field;
            if (isBigTextColumn && !isHideField) {
                col.push({
                    dataIndex: backendName,
                    key: backendName,
                    title: displayName,
                    render: (_: any, record: any) => bigTextHandleRender(_, record, backendName, displayName)
                })
            }
            else if (isDateField && !isHideField) {
                col.push({
                    dataIndex: backendName,
                    key: backendName,
                    title: displayName,
                    render: (_: any, record: any) => dateRender(_, record, backendName)
                })
            } else if (isFormatter && !isHideField) {
                switch (formatterFuncName) {
                    case "inventoryAction": {
                        col.push({
                            dataIndex: backendName,
                            key: backendName,
                            title: displayName,
                            render: (_: any, record: any) => inventoryActionFunc(_, record)
                        })
                        break;
                    }
                    case "inventoryStatusFunc": {
                        col.push({
                            dataIndex: backendName,
                            key: backendName,
                            title: displayName,
                            render: (_: any, record: any) => inventoryStatusFunc(_, record, backendName)
                        })
                        break;
                    }
                    case "redirectToShopDetails": {
                        col.push({
                            dataIndex: backendName,
                            key: backendName,
                            title: displayName,
                            render: redirectToShopDetailsFunc
                        })
                    }
                }
            } else if (!isHideField) {
                col.push({
                    dataIndex: backendName,
                    key: backendName,
                    title: displayName
                })
            }
        });
        setColumnConfig(col);
    }

    useEffect(() => {
        genrateColumnsConfig();
        genrateRowExpandColumnsConfig();
    }, [orginalConfig])
    return (
        <div>
            <Table columns={columnsConfig} dataSource={data.map((item, index) => { return { ...item, key: index } })} pagination={{
                showSizeChanger: true,
                pageSizeOptions: ['5', '10', '20', '50'],
                pageSize: pageSize,
                onShowSizeChange: (_: any, size) => setPageSize(size),
            }}
                expandable={
                    {
                        expandedRowRender: (record: any) => <RowDescription data={record} config={tableExpandConfig} />
                    }
                }
            />
            <Confirmation decisionHandler={onConfirmationHandler} openFormConfirmation={openConfirmationModule} />
        </div>
    )
};

export default TableUI;