import React, { useState } from "react";
import type IInventoryCard from "./IInventoryCard";
import styles from "../../Board.module.css";
import moment from "moment";
import { Tooltip } from "antd";
import { useGetDashboardContextValue } from "../../../Dashboard";
import InventoryConfig from "../../../../../../Services/Config/InventoryConfig";
import Confirmation from "../../../../Confirmation/Confirmation";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const InventoryCard: React.FC<IInventoryCard> = ({ item, tableConfig, header, id }) => {
    const { openEditFormHandler, changeHandlerBigTextModal, deleteHandlerFunc, customFunc, setEditFormFieldsHandler, setEditFormInitialValuesHandler, setEditFormTitleHandler } = useGetDashboardContextValue();
    const [openConfirmationModule, setOpenConfirmationModule] = useState<boolean>(false);
    const { setNodeRef, attributes, listeners, transition, transform } = useSortable({ id });


    const onConfirmationHandler = (decision: boolean) => {
        setOpenConfirmationModule(false);
        if (decision && deleteHandlerFunc) {
            deleteHandlerFunc(item.ID);
        }
    }
    const deleteHandler = () => {
        setOpenConfirmationModule(true);
    }
    const openOrderPlaceFormHandler = () => {
        item = { ...item, Status: "In-Progress" };
        openEditFormHandler();
        setEditFormFieldsHandler(InventoryConfig.newOrderPlaceFormConfig);
        setEditFormInitialValuesHandler(item);
        setEditFormTitleHandler("Edit Inventory Item");
    }
    const recivedOrderHandler = () => {
        if (customFunc) {
            customFunc(item.ID);
        }
    }
    const holdOrderHandler = () => {
        item = { ...item, Status: "Hold" };
        openEditFormHandler();
        setEditFormFieldsHandler(InventoryConfig.holdInventoryRequestFormConfig);
        setEditFormInitialValuesHandler(item);
        setEditFormTitleHandler("Hold Inventory Item");
    }
    const rejectOrderHandler = () => {
        item = { ...item, Status: "Rejected" };
        openEditFormHandler();
        setEditFormFieldsHandler(InventoryConfig.rejectInventoryRequestFormConfig);
        setEditFormInitialValuesHandler(item);
        setEditFormTitleHandler("Reject Inventory Item");
    }
    return (
        <div className={`shadow-lg my-2 rounded-lg  ${styles.cardCss}`} ref={setNodeRef} style={{ transition, transform: CSS.Transform.toString(transform) }}>
            <div className={`flex ${styles.CardHeaderCss}`}>
                <p className="flex items-center mr-1 h-full m-0 w-5 cursor-grab" {...attributes} {...listeners} >
                    <i className={`bi bi-three-dots-vertical w-1 ${styles.headerToggleIconCss}`} />
                    <i className={`bi bi-three-dots-vertical w-1 ${styles.headerToggleIconCss}`} />
                </p>
                <p className={`flex justify-center text-base items-center font-medium w-full m-0`}>
                    {item.ProductName}
                </p>
            </div>
            <div className="grid grid-cols-2">
                {tableConfig.map(config => {
                    const { isDateField, displayName, backendName, isHideField, isNotRequiredOnBoard, isBigTextColumn } = config;
                    if (backendName === "ProductName" || isNotRequiredOnBoard) return null;
                    if (isHideField) return null;
                    if (isBigTextColumn && !isHideField) {
                        const str: string = item[config.backendName];
                        return <Tooltip title={displayName} arrow placement="top">
                            <div className="flex m-1 items-center">
                                <p className="m-0"><span className={`font-normal  shadow-lg m-1 rounded-lg ${styles.cardIconCss}`}><i className={config.icon} /></span></p>
                                <p className={`text-xs m-0  break-all whitespace-normal ${styles.cardTextColor} ${styles.bigTextColumn}`} onClick={() => changeHandlerBigTextModal({ open: true, text: str, propertyName: displayName })}>{str.split(" ").slice(0, 4).join(" ")}...</p>
                            </div>
                        </Tooltip>
                    }
                    return <Tooltip title={displayName} arrow placement="top">
                        <div className="flex m-1 items-center ">
                            <p className="m-0"><span className={`font-normal  shadow-lg m-1 rounded-lg ${styles.cardIconCss}`}><i className={config.icon} /></span></p>
                            <p className={`text-xs m-0  break-all whitespace-normal ${styles.cardTextColor} m-0 w-full`}>{isDateField && item[backendName] ? moment(item[config.backendName]).format("DD-MM-YYYY HH:MM") : item[config.backendName]}</p>
                        </div>
                    </Tooltip>
                })}
            </div>
            <hr className="m-1" />
            <div className="flex justify-end m-1">
                <p className="m-1">
                    {header !== "In-Progress" && <Tooltip title="Order Place" placement="top">
                        <span className={`p-1 m-1 rounded-lg ${styles.ActioniconCSS}`} onClick={openOrderPlaceFormHandler}>
                            <i className="bi bi-pencil-square" />
                        </span>
                    </Tooltip>}
                    {header !== "New" && <span className={`p-1 m-1 rounded-lg ${styles.ActioniconCSS}`} onClick={recivedOrderHandler} >
                        <i className="bi bi-check-circle" />
                    </span>}
                    <span className={`p-1 m-1 rounded-lg ${styles.ActioniconCSS}`} onClick={holdOrderHandler}>
                        <i className="bi bi-pause-circle" />
                    </span>
                    <span className={`p-1 m-1 rounded-lg ${styles.ActioniconCSS}`} onClick={rejectOrderHandler} >
                        <i className="bi bi-x-circle-fill" />
                    </span>
                    <span className={`p-1 m-1 rounded-lg ${styles.ActioniconCSS}`} onClick={deleteHandler}>
                        <i className="bi bi-trash3-fill" />
                    </span>
                </p>
            </div>
            <Confirmation openFormConfirmation={openConfirmationModule} decisionHandler={onConfirmationHandler} />
        </div>
    )
};

export default InventoryCard;