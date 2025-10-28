import { useParams } from "react-router-dom";
import APICallingServices from "../APICallingService";
import type IAddContainerInterface from "../Interface/ContainerInterface";
import type { IContainerColumnDetails, IContainerRowDetails } from "../Interface/CreateContainerInterface";
import type CreateContainerInterface from "../Interface/CreateContainerInterface";
import type { IContainerDetailsInterface } from "../Interface/ShopDetailsInterface";
import type IAddProductInterface from "../Interface/AddProductInterface";

const useShopInventoryAction = () => {
    const { id } = useParams();

    const addContainer = async (value: IAddContainerInterface, rowHeight: Array<number>, columnWidth: Array<Array<number>>, containerName: string) => {
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
            Name: containerName,
            Height: value.height,
            Width: value.width,
            NoOfRows: noOfRows,
            Depth: value.depth
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
    const addProductHandler = async (data: IAddProductInterface) => {
        const apiObj = new APICallingServices();
        const prdImageURLs: Array<string> = [];

        for (const file of data.ProductImages) {
            let { name: fileName = "", type: fileType = "" } = file;
            fileName = "Product/" + fileName;
            const response = await apiObj.getDataFromBackend("/aws/getURLForUploadFileInS3", {
                key: fileName,
                contentType: fileType
            });
            if (response.success && response.data) {
                try {
                    await apiObj.uploadFileToS3(response.data, file, fileType);
                    prdImageURLs.push(fileName); // Only push after successful upload
                    console.log("Uploaded file to S3:", fileName);
                } catch (uploadError) {
                    console.error("S3 upload failed for", fileName, uploadError);
                }
            } else {
                console.warn("Failed to get S3 URL for", fileName, response);
            }
        }

        const ContainerName: string = (data.position && data.position.length > 0) ? data.position[0].ContainerName : "";
        const RowNumber: number = (data.position && data.position.length > 0) ? data.position[0].RowNumber : 0;
        const ColumnNumber: number = (data.position && data.position.length > 0) ? data.position[0].ColumnNumber : 0;
        const ContainerTableID: number = (data.position && data.position.length > 0) ? data.position[0].ContainerID : 0;

        const response = await apiObj.getDataFromBackend("/shopInventory/addProduct",
            {
                ProductName: data.ProductName,
                CategoryType: data.CategoryType,
                SubCategoryType: data.SubCategoryType,
                Quantity: data.Quantity,
                CostToBuy: data.Cost,
                PerItemProfit: data.PerItemProfit,
                ContainerName: ContainerName,
                RowNumber: RowNumber,
                ColumnNumber: ColumnNumber,
                Height: data.Height,
                Width: data.Width,
                Depth: data.Depth,
                LowStock: data.LowStock,
                ExpiredDate: data.ExpiredDate,
                ProductImagesURL: prdImageURLs.join("||"),
                ProductDescription: data.ProductDescription,
                ProductPositionInfo: data.ProductPositioningInfo,
                ContainerTableID,
                ShopDetailID: id
            }
        );
        return response;
    }

    return { addContainer, addProductHandler, containerDetails, getContainerDetailsAboutSpace, onePerticularContainerDetails, genrateContainerView };
};

export default useShopInventoryAction;