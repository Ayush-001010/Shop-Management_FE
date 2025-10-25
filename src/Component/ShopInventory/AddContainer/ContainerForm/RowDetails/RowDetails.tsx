import React, { useEffect, useState } from "react";
import type IRowDetails from "./IRowDetails";
import { Collapse, Input } from "antd";
import ColumnDetails from "./ColumnDetails/ColumnDetails";
import type { ICollapseItemInterface, IRowDetailsValueInterface } from "../../../../../Services/Interface/ContainerInterface";
import styles from "../../AddContainer.module.css";

const RowDetails: React.FC<IRowDetails> = ({ applyHeightHandler, applyColumnHandler, setColumnWidthInPerticularRow }) => {
    const [collapseItems, setCollapseItems] = useState<Array<ICollapseItemInterface>>([]);
    const [value, setValue] = useState<IRowDetailsValueInterface>({
        height: 0,
        noOfCols: 0,
        colsWidth: []
    });

    const changeHandler = (newValue: number, backendName: keyof IRowDetailsValueInterface) => {
        setValue((prevState) => {
            return { ...prevState, [backendName]: newValue };
        })
    };
    const changeWidth = (newValue: number, index: number) => {
        setValue((prevState) => {
            prevState.colsWidth[index] = newValue;
            return { ...prevState };
        });
        setColumnWidthInPerticularRow(index, newValue);
    }
    const genrateCollapseItemForColumnDetails = () => {
        const items: Array<ICollapseItemInterface> = [];
        const arr: Array<number> = [];
        for (let index = 0; index < value.noOfCols; index++) {
            arr.push(0);
            items.push({
                key: index.toString(),
                label: <p className="font-semibold m-0">Column Details:{index + 1}</p>,
                children: <ColumnDetails changeWidth={(newValue: number) => changeWidth(newValue, index)} />
            });
        }
        setCollapseItems(items);
        setValue((prevState) => {
            return { ...prevState, colsWidth: arr };
        })
    };

    useEffect(() => {
        const obj = setTimeout(() => {
            genrateCollapseItemForColumnDetails();
        }, 1000);
        return () => clearTimeout(obj);
    }, [value.noOfCols]);
    useEffect(() => {
        const obj = setTimeout(() => {
            applyHeightHandler(value.height);
        }, 2000);
        return () => clearTimeout(obj);
    }, [value.height])
    useEffect(() => {
        const obj = setTimeout(() => {
            applyColumnHandler(value.noOfCols)
        }, 2000);
        return () => clearTimeout(obj);
    }, [value.noOfCols])
    return (
        <div>
            <div className="flex">
                <div className="w-1/2">
                    <p className={`${styles.labelCSS} m-0 font-medium`}>Row Height <span className={`${styles.labelDescriptionTextCSS} ml-1`}>(In meter)</span></p>
                    <Input type="number" min={0} value={value.height} onChange={({ target }) => changeHandler(Number(target.value), "height")} />
                </div>
                <div className="w-1/2 ml-1">
                    <p className={`${styles.labelCSS} m-0 font-medium`}>No Of Columns</p>
                    <Input type="number" min={0} max={4} value={value.noOfCols} onChange={({ target }) => changeHandler(Number(target.value), "noOfCols")} />
                </div>
            </div>
            {(value.noOfCols > 0 && value.height > 0) &&
                <div className="mt-3">
                    <Collapse items={collapseItems} />
                </div>
            }
        </div>
    )
};

export default RowDetails;