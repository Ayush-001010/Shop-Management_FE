import React, { useMemo, useState } from "react";
import type IInventoryRequest from "./IInventoryRequest";
import { motion } from 'framer-motion';
import Calender from "../UI/Calender/Calender";
import InventoryConfig from "../../Services/Config/InventoryConfig";
import Dashboard from "../UI/Dashboard/Dashboard";
import useInventoryAction from "../../Services/CustomHook/useInventoryAction";
import { message } from "antd";
import CommonConfig from "../../Services/Config/CommonConfig";
import Activities from "../UI/Activities/Activities";
import type { IActivitiesDataInterface } from "../../Services/Interface/ActivitiesInterface";

const InventoryRequest: React.FunctionComponent<IInventoryRequest> = () => {
    const { createNewInventoryRequest, clearHandler, orderRecivedHandler, searchHandlerOfBoard, deleteHandler, editHandler, applyHandlerOfBoardFilterFunc, newStatusData, calendarData, inProgressData, holdData, rejectedData, completedData, data, activitesHandler } = useInventoryAction();
    const [messageAPI, contextHandler] = message.useMessage();
    const [activityData, setActivityData] = useState<Array<IActivitiesDataInterface>>([]);
    const initialFormValue = useMemo(() => {
        return {
            RequestBy: "texting@gmail.com",
            RequestDate: new Date()
        }
    }, []);

    const activitiesHandler = async (type: string) => {
        const response = await activitesHandler(type);
        if (response.success) {
            const arr: Array<IActivitiesDataInterface> = [];
            for (const key in response.data) {
                arr.push({ name: key, value: response.data[key] });
            }
            setActivityData(arr);
        }
    }
    const editHandlerFunc = async (updatedValue: Record<string, any>) => {
        messageAPI.destroy();
        messageAPI.loading(CommonConfig.loadingMessage);
        const response = await editHandler(updatedValue);
        messageAPI.destroy();
        if (response.success) {
            messageAPI.success(CommonConfig.successUpdateDataMessage);
        } else {
            messageAPI.error(CommonConfig.errorMessage);
        }
        return response;
    }
    const createNewInventoryRequestHandler = async (value: Record<string, any>) => {
        messageAPI.destroy();
        messageAPI.loading(CommonConfig.loadingMessage);
        const response = await createNewInventoryRequest(value);
        messageAPI.destroy();
        if (response.success) {
            messageAPI.success(CommonConfig.successAddDataMessage);
        } else {
            messageAPI.error(CommonConfig.errorMessage);
        }
    };
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            {contextHandler}
            <div className="flex">
                <div className="w-5xl ml-10 h-30">
                    <Calender title={InventoryConfig.title} calenderOptions={InventoryConfig.option} currentDayDisplay={7} items={calendarData}>
                        <div className="flex justify-between">
                            <Calender.Title />
                            <div className="flex justify-between w-xs">
                                {/* <Calender.CalenderOption /> */}
                                {/* <Calender.CalenderRange /> */}
                                {/* <Calender.CalenderIcon /> */}
                            </div>
                        </div>
                    </Calender>
                </div>
                <div className="shadow-sm m-1 rounded-sm p-1 w-full h-60">
                    <Activities activitiesOption={InventoryConfig.activitiesOption} activityHandler={activitiesHandler} activityData={activityData} />
                </div>
            </div>

            <Dashboard clearHandler={clearHandler} deleteHandlerFunc={deleteHandler} customFunc={orderRecivedHandler} tableFilterConfig={InventoryConfig.tableFilterConfig} boardFilterConfig={InventoryConfig.boardFilterConfig} formSubmitHandler={createNewInventoryRequestHandler} initialFormValue={initialFormValue} boardHeaderArr={InventoryConfig.boardHeaderArrayConfig} boardData={[[...newStatusData], [...inProgressData], [...holdData], [...completedData], [...rejectedData]]} boardCardType="Inventory" tableConfig={InventoryConfig.tableConfig} tablePropertiesArr={InventoryConfig.tablePropertiesArr} openFormButtonText={InventoryConfig.openFormButtonText} formFields={InventoryConfig.newInventoryFormConfig} formTitle={InventoryConfig.newInventoryFormTitle} applyHandlerOfFilterFunc={applyHandlerOfBoardFilterFunc} searchHandler={searchHandlerOfBoard} allData={data} editHandlerFunc={editHandlerFunc}>
                <div className="flex justify-between">
                    <Dashboard.Toggle />
                    <div className="flex">
                        <Dashboard.TableQuerying />
                        <Dashboard.Properties />
                        <Dashboard.Form />
                        <Dashboard.EditForm />
                        <Dashboard.BigTextModal />
                        <Dashboard.StatusSteps />
                    </div>
                </div>
            </Dashboard>
        </motion.div>
    )
};

export default InventoryRequest;