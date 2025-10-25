import { useMemo } from "react";
import type IContainerDetailsInterface from "../Interface/ContainerDetailsInterface";
import type { IProductDetailsInterface, ISerachProductPlaceDetailsInterface } from "../Interface/ContainerDetailsInterface";

const useContainerImageAction = () => {
    const containerHeight = useMemo(() => 510, []);
    const containerWidth = useMemo(() => 600, []);

    const createRow = (data: IContainerDetailsInterface) => {
        const rows: Array<number> = [];
        const height = data.Height;
        const oneMeterHeight = containerHeight / height;
        for (const rowItem of data.RowDetails) {
            rows.push(rowItem.RowHeight * oneMeterHeight);
        }
        return rows;
    }
    const createColumns = (data: IContainerDetailsInterface) => {
        const cols: Array<Array<number>> = [];
        const width = data.Width;
        const oneMeterWidth = containerWidth / width;
        for (const rowItem of data.RowDetails) {
            const col = [];
            for (const colItem of rowItem.columns) {
                col.push(colItem.Width * oneMeterWidth);
            }
            cols.push(col);
        }
        return cols;
    }
    const createProductImages = (data: IContainerDetailsInterface, productDetails: ISerachProductPlaceDetailsInterface) => {
        const prd: Array<Array<Array<Array<any>>>> = [];
        const height = data.Height;
        const width = data.Width;
        const noOfRows = data.NoOfRows;
        for (let index = 0; index < noOfRows; index++) {
            prd.push([]);
            const noOfCols = data.RowDetails[index].NoOfColumns;
            for (let index1 = 0; index1 < noOfCols; index1++) {
                prd[index].push([]);
            }
        }

        for (let index = 0; index < productDetails.containerProduct.length; index++) {
            const { ColumnNumber, RowNumber, WidthE, HeightE, HeightS , WidthS } = productDetails.containerProduct[index];
            const prd1: Array<any> = [];
            const oneMeterHeight = containerHeight / height;
            const oneMeterWidth = containerWidth / width;
            const obj = { ...productDetails.containerProduct[index], Height: oneMeterHeight * (HeightE - HeightS) , Width :  (oneMeterWidth * (WidthE - WidthS))}
            prd1.push(obj);
            for (let index1 = index + 1; index1 < productDetails.containerProduct.length; index1++) {
                if (productDetails.containerProduct[index1].ColumnNumber === ColumnNumber && productDetails.containerProduct[index1].RowNumber === RowNumber) {
                    if (productDetails.containerProduct[index1].WidthS < WidthE) {
                        prd1.push(productDetails.containerProduct[index1]);
                    }
                }
            }
            prd[RowNumber - 1][ColumnNumber - 1].push(prd1);
        }

        return prd;
    }

    return { createRow, createColumns, createProductImages };
};

export default useContainerImageAction;