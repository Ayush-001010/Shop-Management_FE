import { useParams } from "react-router-dom";
import APICallingServices from "../APICallingService";
import type IAddContainerInterface from "../Interface/ContainerInterface";
import type { IContainerColumnDetails, IContainerRowDetails } from "../Interface/CreateContainerInterface";
import type CreateContainerInterface from "../Interface/CreateContainerInterface";
import type { IContainerDetailsInterface } from "../Interface/ShopDetailsInterface";

const useShopInventoryAction = () => {
    const { id } = useParams();

    const addContainer = async (value: IAddContainerInterface, rowHeight: Array<number>, columnWidth: Array<Array<number>>) => {
        const noOfRows: Array<IContainerRowDetails> = [];
        for (let index = 0; index < rowHeight.length; index++) {
            const cols: Array<IContainerColumnDetails> = [];
            for (let index1 = 0; index1 < columnWidth[index].length; index1++) {
                cols.push({
                    Width: columnWidth[index][index1]
                })
            }
            noOfRows.push({
                RowNumber: index + 1,
                RowHeight: rowHeight[index],
                NoOfColumns: cols
            })
        }
        const addObj: CreateContainerInterface = {
            Name: "A",
            Height: value.height,
            Width: value.width,
            NoOfRows: noOfRows
        };

        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/shopInventory/addContainer", { data: addObj, ShopID: id });
        return response;
    }
    const containerDetails = async (containerID: number) => {
        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/shopInventory/containerDetails", { containerID });
        return response;
    }
    const getContainerDetailsAboutSpace = async () => {
        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/shopInventory/getContainerDetailsAboutSpace", {
            ShopID: id
        });
        return response;
    }
    const onePerticularContainerDetails = async (ID: number) => {
        try {
            const apiObj = new APICallingServices();
            const response = await apiObj.getDataFromBackend("/shopInventory/onePerticularContainerDetails", { ID });
            return response;
        } catch (error) {
            console.log("Error  ", error);
            return { success: false, data: null };
        }
    }
    const genrateContainerView = (data: IContainerDetailsInterface) => {
        const val: any = [];
        let rowNumber = 0;
        for (const rows of data.rows) {
            const arr: any = [];
            rowNumber++;
            for (let i = 0; i < rows.height; i++) {
                const cols: any = [];
                let colNumber = 0;
                for (const col of rows.cols) {
                    colNumber++;
                    const colVal: Array<{ RowNumber: number, ColumnNumber: number, RowIndex: number, ColumnIndex: number }> = [];
                    for (let j = 0; j < col * 5; j++) {
                        colVal.push({ RowNumber: rowNumber, ColumnNumber: colNumber, RowIndex: i, ColumnIndex: j });
                    }
                    cols.push(colVal);
                }
                arr.push(cols);
            }
            val.push(arr);
        }
        val.reverse();
        return val;
    }
    return { addContainer, containerDetails, getContainerDetailsAboutSpace, onePerticularContainerDetails, genrateContainerView };
};

export default useShopInventoryAction;