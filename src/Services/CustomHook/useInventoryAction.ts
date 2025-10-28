import APICallingServices from "../APICallingService";
import { useState, useEffect } from "react";
import type ICalendarDataInterface from "../Interface/CalendarInterface";

const useInventoryAction = () => {
    const [data, setData] = useState<Array<any>>([]);
    const [newStatusData, setNewStatusData] = useState<Array<any>>([]);
    const [inProgressData, setInProgressData] = useState<Array<any>>([]);
    const [rejectedData, setRejectedData] = useState<Array<any>>([]);
    const [holdData, setHoldData] = useState<Array<any>>([]);
    const [completedData, setCompletedData] = useState<Array<any>>([]);
    const [calendarData, setCalendarData] = useState<Array<ICalendarDataInterface>>([]);

    const getCalendarDataFunc = async () => {
        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/inventory/calendar");
        const arr: Array<ICalendarDataInterface> = [];
        if (response.success) {
            response.data.forEach((item: any) => {
                const currentDate = new Date();
                const { Status, ProductName, ProductType, OrderDate, ExpectedReachedDate, ReachedDate } = item;
                if (Status === "Complete") {
                    arr.push({
                        title: `${ProductName} (${ProductType})`,
                        endDate: ReachedDate,
                        startDate: OrderDate,
                        status: "Finished"
                    })
                } else if (currentDate > ExpectedReachedDate) {
                    arr.push({
                        title: `${ProductName} (${ProductType})`,
                        endDate: ExpectedReachedDate,
                        startDate: OrderDate,
                        status: "Delayed"
                    })
                } else {
                    arr.push({
                        title: `${ProductName} (${ProductType})`,
                        endDate: ExpectedReachedDate,
                        startDate: OrderDate,
                        status: "On-Going"
                    })
                }
            });
        }
        setCalendarData(arr);
    }
    const deleteHandler = async (ID: number) => {
        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/inventory/delete", { ID });
        if (response.success) {
            getDataHandler();
        }
        return response;
    }
    const activitesHandler = async (type: string) => {
        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/inventory/activity", { type });
        return response;
    }
    const orderRecivedHandler = async (Id: number) => {
        const apiObj = new APICallingServices();
        const response = await apiObj.addDataToBackend("/inventory/complete", { Id });
        if (response.success) {
            getDataHandler();
        }
        return response;
    }
    const editHandler = async (updatedValue: Record<string, any>) => {
        const apiObj = new APICallingServices();
        const response = await apiObj.addDataToBackend("/inventory/update", updatedValue);
        if (response.success) {
            getDataHandler();
            getCalendarDataFunc();
        }
        return response;
    }
    const createNewInventoryRequest = async (value: Record<string, any>) => {
        const apiObj = new APICallingServices();
        const response = await apiObj.addDataToBackend("/inventory/add", value);
        getDataHandler();
        return response;
    };
    const getDataHandler = async () => {
        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/inventory/get");
        if (response.success) {
            const { allData, newStatusData, inProgressData, holdData, completeData, rejectedData } = response.data;
            setData(allData);
            setCompletedData(completeData);
            setInProgressData(inProgressData);
            setHoldData(holdData);
            setNewStatusData(newStatusData);
            setRejectedData(rejectedData);
        }
    };
    const applyHandlerOfBoardFilterFunc = async (filterValue: any, type?: "New" | "InProgress" | "Complete" | "Hold" | "Rejected" | "All") => {
        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/inventory/filterData", { type, filterObj: filterValue });
        if (response.success) {
            switch (type) {
                case "New": {
                    setNewStatusData(response.data);
                    break;
                }
                case "All": {
                    setData(response.data);
                    break;
                }
            }
        }
    };
    const searchHandlerOfBoard = async (searchValue: any, type?: "New" | "InProgress" | "Complete" | "Hold" | "Rejected" | "All") => {
        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/inventory/search", { searchValue, type });
        if (response.success) {
            switch (type) {
                case "New": {
                    setNewStatusData(response.data);
                    break;
                };
                case "All": {
                    setData(response.data);
                    break;
                };
            }
        }
    };
    const clearHandler = async (type: "New" | "In-Progress" | "Rejected" | "Hold" | "Completed" | "All") => {
        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/inventory/get");
        if (response.success) {
            const { allData, newStatusData, inProgressData, holdData, completeData, rejectedData } = response.data;
            switch (type) {
                case "All": {
                    setData(allData);
                    break;
                } case "Completed": {
                    setCompletedData(completeData);
                    break;
                } case "In-Progress": {
                    setInProgressData(inProgressData);
                    break;
                } case "Hold": {
                    setHoldData(holdData);
                    break;
                } case "New": {
                    setNewStatusData(newStatusData);
                    break;
                } case "Rejected": {
                    setRejectedData(rejectedData);
                    break;
                }
            }
        }
    }

    useEffect(() => {
        getDataHandler();
        getCalendarDataFunc();
    }, []);

    return { createNewInventoryRequest, clearHandler, deleteHandler, activitesHandler, orderRecivedHandler, editHandler, data, calendarData, newStatusData, inProgressData, rejectedData, holdData, completedData, applyHandlerOfBoardFilterFunc, searchHandlerOfBoard };
};

export default useInventoryAction;