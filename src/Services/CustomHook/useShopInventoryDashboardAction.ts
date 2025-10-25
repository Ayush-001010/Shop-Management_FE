import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APICallingServices from "../APICallingService";

const useShopInventoryDashboardAction = () => {
    const [sellTrackingData, setSellTrackingData] = useState<Array<number>>([]);
    const [notes, setNotes] = useState<Array<any>>([]);
    const [data, setData] = useState<Array<any>>([]);
    const { id } = useParams();

    const getSellTrackingData = async () => {
        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/shopInventory/sellRecordCount", { shopID: id });

        if (response.success) {
            setSellTrackingData(response.data);
        }
    }
    const addNoteFunc = async (Note: string) => {
        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/shopInventory/crudNotes", {
            addObj: {
                Note,
            },
            shopID: id,
            type: "Add"
        });
        if (response.success) {
            getNoteFunc();
        }
        return response;
    }
    const getNoteFunc = async () => {
        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/shopInventory/crudNotes", {
            type: "Get",
            shopID: id
        });
        if (response.success) {
            setNotes(response.data);
        }
    }
    const deleteNoteFunc = async (ID: number) => {
        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/shopInventory/crudNotes", {
            ID,
            type: "Delete"
        });
        if (response.success) {
            getNoteFunc();
        }
        return response;
    }
    const getDataHandler = async () => {
        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/shopInventory/getData", {
            ShopID: id
        });
        if (response.success) {
            setData(response.data);
        }
    }

    useEffect(() => {
        getSellTrackingData();
        getNoteFunc();
        getDataHandler();
    }, []);

    return { sellTrackingData, addNoteFunc, notes, deleteNoteFunc, getDataHandler, data };
};

export default useShopInventoryDashboardAction;