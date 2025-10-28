import React, { useMemo, useState } from "react";
import type IAddContainer from "./IAddContainer";
import { Button, Drawer } from "antd";
import Header from "./Header/Header";
import Container from "./ContainerImage/Container";
import ContainerForm from "./ContainerForm/ContainerForm";
import type IAddContainerInterface from "../../../Services/Interface/ContainerInterface";
import styles from "./AddContainer.module.css";
import useShopInventoryAction from "../../../Services/CustomHook/useShopInventoryAction";
import SuccessfullyDoneModal from "../../UI/SuccessfullyDoneModal/SuccessfullyDoneModal";
import useMessage from "antd/es/message/useMessage";
import Review from "./Review/Review";


const AddContainer: React.FC<IAddContainer> = ({ open, closeHandler, newContainerName }) => {
    const [rows, setRows] = useState<Array<string>>([]);
    const [messageAPI, contextHandler] = useMessage();
    const [columns, setColumns] = useState<Array<Array<string>>>([]);
    const height = useMemo(() => 480, []);
    const width = useMemo(() => 600, []);
    const [value, setValue] = useState<IAddContainerInterface>({
        height: 0,
        width: 0,
        noOfRows: 0,
        depth: 0
    });
    const { addContainer } = useShopInventoryAction();
    const [rowHeight, setRowHeight] = useState<Array<number>>([]);
    const [columnWidth, setColumnWidth] = useState<Array<Array<number>>>([]);
    const [openReview, setOpenReview] = useState<boolean>(false);
    const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);


    const submitHandler = async () => {
        const response = await addContainer(value, rowHeight, columnWidth, newContainerName);
        if (response.success) {
            setOpenSuccessModal(true);
        }
    }
    const closeReviewFunc = () => setOpenReview(false);
    const openReviewFunc = () => {
        messageAPI.destroy();
        if (value.height === 0 || value.height === 0 || value.noOfRows === 0) {
            if (value.height === 0)
                messageAPI.error({ content: "Height must be greater than zero." });
            else if (value.width === 0)
                messageAPI.error({ content: "Width must be greater than zero." });
            else
                messageAPI.error({ content: "Container must contain at least one row." });
            return;
        } else if (rowHeight.includes(0)) {
            messageAPI.error({ content: "Row height must be greater than zero." });
            return;
        } else if (columnWidth.find((val) => val.length === 0)) {
            messageAPI.error({ content: "Each row must contain at least one column." });
            return;
        } else if (columnWidth.find((val) => val.includes(0))) {
            messageAPI.error({ content: "Column Width must be greater than zero." });
            return;
        }
        setOpenReview(true);
    }
    const changeHandler = (newValue: number, backendName: keyof IAddContainerInterface) => {
        setValue((prevState) => {
            return { ...prevState, [backendName]: newValue };
        })
    }
    const setRowHeightFunc = (index: number, newRowHeight: number) => {
        messageAPI.destroy();
        const oneMeterHeight = height / value.height;
        setRows((prevState) => {
            prevState[index] = (oneMeterHeight * newRowHeight).toString();
            return [...prevState];
        })
        setRowHeight((prevState) => {
            prevState[index] = newRowHeight;
            return [...prevState];
        })
    }
    const setColumnWidthInPerticularRow = (index: number, colIndex: number, newColumnWidth: number) => {
        const oneMeterWidth = width / value.width;
        setColumns((prevState) => {
            prevState[index][colIndex] = (oneMeterWidth * newColumnWidth).toString();
            return [...prevState]
        })
        setColumnWidth((prevState) => {
            prevState[index][colIndex] = newColumnWidth;
            return [...prevState]
        })
    }
    const defineNumberOfColumnsInPerticularRow = (newNumberColumns: number, index: number) => {
        setColumns((prevState) => {
            const arr = [];
            for (let i = 0; i < newNumberColumns; i++) {
                arr.push("");
            }
            prevState[index] = arr;
            return [...prevState];
        })
    }
    const defineNumberOfRows = (newRowValue: number) => {
        const arr: Array<string> = [];
        const arr1: Array<Array<any>> = [];
        const arr2: Array<number> = [];
        for (let index = 0; index < newRowValue; index++) {
            arr1.push([]);
            arr.push("");
            arr2.push(0);
        }
        setRows(arr);
        setColumns(arr1);
        setRowHeight(arr2);
        setColumnWidth(arr1);
    }

    return (
        <Drawer open={open} onClose={closeHandler} size="large" title={<Header />} >
            {contextHandler}
            <div className="p-1">
                <Container rowHeight={rowHeight} columnWidth={columnWidth} rows={rows} columns={columns} />
                {!openReview && <>
                    <ContainerForm setRowHeightFunc={setRowHeightFunc} defineNumberOfRows={defineNumberOfRows} value={value} changeHandler={changeHandler} defineNumberOfColumnsInPerticularRow={defineNumberOfColumnsInPerticularRow} setColumnWidthInPerticularRow={setColumnWidthInPerticularRow} />
                    <div className="flex justify-end mt-2">
                        <Button className={` ${styles.SubmitButtonCSS}`} onClick={openReviewFunc} >
                            Submit
                        </Button>
                    </div>
                </>}
                {openReview && <Review submitHandler={submitHandler} closeReviewFunc={closeReviewFunc} />}
            </div>
            <SuccessfullyDoneModal open={openSuccessModal} title="Container Added Successfully." description="Success! You've added a new container to your shop, increasing your product storage capacity." />
        </Drawer>
    )
};

export default AddContainer;