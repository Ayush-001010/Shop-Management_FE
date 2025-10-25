import React, { useEffect, useState } from "react";
import type IContainerForm from "./IContainerForm";
import { Collapse, Input } from "antd";
import type { ICollapseItemInterface } from "../../../../Services/Interface/ContainerInterface";
import RowDetails from "./RowDetails/RowDetails";
import styles from "../AddContainer.module.css";

const ContainerForm: React.FC<IContainerForm> = ({ defineNumberOfRows, setRowHeightFunc, value, changeHandler, defineNumberOfColumnsInPerticularRow, setColumnWidthInPerticularRow }) => {
    const [rowDetailsCollapseItems, setRowDetailsCollapseItems] = useState<Array<ICollapseItemInterface>>([]);



    const heightChangeHandler = (newValue: number, index: number) => {
        setRowHeightFunc(index, newValue);
    }

    const genrateCollapseItemOfRowDetails = () => {
        const items: Array<ICollapseItemInterface> = [];
        for (let index = 0; index < value.noOfRows; index++) {
            items.push({
                key: index.toString(),
                label: <p className="font-semibold m-0">Row Details:{index + 1}</p>,
                children: <RowDetails applyHeightHandler={(value) => { heightChangeHandler(value, index) }} applyColumnHandler={(value) => { defineNumberOfColumnsInPerticularRow(value, index) }} setColumnWidthInPerticularRow={(colIndex: number, newValue: number) => setColumnWidthInPerticularRow(index, colIndex, newValue)} />
            })
        }
        const arr: Array<string> = [];
        for (let index = 0; index < value.noOfRows; index++) {
            arr.push("");
        }
        setRowDetailsCollapseItems(items);
    }

    useEffect(() => {
        const obj = setTimeout(() => {
            genrateCollapseItemOfRowDetails();
        }, 1000);
        return () => clearTimeout(obj);
    }, [value.noOfRows]);
    useEffect(() => {
        const obj = setTimeout(() => {
            defineNumberOfRows(value.noOfRows);
        }, 2000);
        return () => clearTimeout(obj);
    }, [value.noOfRows])

    return (
        <div className="mt-10">
            <p className={`text-sm font-semibold ${styles.containerDetailsFormHeaderCss}`}>Container Details:- </p>
            <div className="p-1">
                <div className="flex justify-between">
                    <div className="w-1/2">
                        <p className={`${styles.labelCSS} m-0 font-medium`}>Height <span className={`${styles.labelDescriptionTextCSS} ml-1`}>(In meter)</span></p>
                        <Input type="number" min={0} max={8} value={value.height} onChange={({ target }) => changeHandler(Number(target.value), "height")} />
                    </div>
                    <div className="w-1/2 ml-1">
                        <p className={`${styles.labelCSS} m-0 font-medium`}>Width <span className={`${styles.labelDescriptionTextCSS} ml-1`}>(In meter)</span></p>
                        <Input type="number" min={0} max={8} value={value.width} onChange={({ target }) => changeHandler(Number(target.value), "width")} />
                    </div>
                </div>
                <div className="flex justify-between mt-1">
                    <div className="w-1/2">
                        <p className={`${styles.labelCSS} m-0 font-medium`}>How many Rows?</p>
                        <Input type="number" min={0} max={5} value={value.noOfRows} onChange={({ target }) => changeHandler(Number(target.value), "noOfRows")} />
                    </div>
                    <div className="w-1/2 ml-1">
                        <p className={`${styles.labelCSS} m-0 font-medium`}>Depth <span className={`${styles.labelDescriptionTextCSS} ml-1`}>(In meter)</span></p>
                        <Input type="number" min={0} max={8} value={value.depth} onChange={({ target }) => changeHandler(Number(target.value), "depth")} />
                    </div>
                </div>
            </div>
            {(value.noOfRows > 0 && rowDetailsCollapseItems.length > 0 && value.height > 0 && value.width > 0) && <div className="mt-10">
                <Collapse items={rowDetailsCollapseItems} />
            </div>}
        </div>
    )
};

export default ContainerForm;