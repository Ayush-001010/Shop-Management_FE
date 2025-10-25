import React, { useEffect, useState } from "react";
import type IContainerView from "./IContainerView";
import useShopInventoryAction from "../../../../../Services/CustomHook/useShopInventoryAction";
import { Button } from "antd";

const ContainerView: React.FC<IContainerView> = ({ data, changeTheStepHandler }) => {
    const { genrateContainerView } = useShopInventoryAction();
    const [containerConfigration, setContainerConfigration] = useState<Array<Array<Array<Array<{ RowNumber: number, ColumnNumber: number, RowIndex: number, ColumnIndex: number }>>>>>([]);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    const [selectedBoxs, setSelectedBoxs] = useState<Array<{ RowNumber: number, ColumnNumber: number, RowIndex: number, ColumnIndex: number }>>([]);

    const reset = () => setSelectedBoxs([]);
    const mouseDownHandler = (item: { RowNumber: number, ColumnNumber: number, RowIndex: number, ColumnIndex: number }) => {
        setSelectedBoxs((prevState) => {
            const find = prevState.filter(item1 => {
                return item1.RowIndex === item.RowIndex && item1.ColumnIndex === item.ColumnIndex && item1.RowNumber === item.RowNumber && item1.ColumnNumber === item.ColumnNumber;
            });
            if (find.length === 0) {
                setIsMouseDown(true);
                if (prevState.length > 0) {
                    const lastEle = prevState[prevState.length - 1];
                    if (lastEle.ColumnIndex + 1 === item.ColumnIndex && lastEle.RowIndex + 1 === item.RowIndex) {
                        const firstEle = prevState[0];
                        const arr: Array<{ RowNumber: number, ColumnNumber: number, RowIndex: number, ColumnIndex: number }> = [];
                        for (let index = item.ColumnIndex - 1; index >= firstEle.ColumnIndex; index--) {
                            const obj: { RowNumber: number, ColumnNumber: number, RowIndex: number, ColumnIndex: number } = { RowIndex: item.RowIndex, RowNumber: item.RowNumber, ColumnIndex: index, ColumnNumber: item.ColumnNumber };
                            arr.push(obj);
                        }
                        for (let index = item.RowIndex - 1; index >= firstEle.RowIndex; index--) {
                            const obj: { RowNumber: number, ColumnNumber: number, RowIndex: number, ColumnIndex: number } = { RowIndex: index, RowNumber: item.RowNumber, ColumnIndex: item.ColumnIndex, ColumnNumber: item.ColumnNumber };
                            arr.push(obj);
                        }
                        return [...prevState, ...arr, item];
                    }
                }
                return [...prevState, item];
            } else {
                const arr = prevState.filter(item1 => {
                    return !(item1.RowIndex === item.RowIndex && item1.ColumnIndex === item.ColumnIndex && item1.RowNumber === item.RowNumber && item1.ColumnNumber === item.ColumnNumber)
                });
                console.log(prevState.length + " " + arr.length);
                setIsMouseDown(false);
                return [...arr];
            }
        });
    }
    const mouseUpHandler = () => {
        setIsMouseDown(false);
    }
    const mouseEnterHandler = (item: { RowNumber: number, ColumnNumber: number, RowIndex: number, ColumnIndex: number }) => {
        if (isMouseDown) {
            console.log("Mouse Enter    ", item);
            setSelectedBoxs((prevState) => {
                const lastEle = prevState[prevState.length - 1];
                if (lastEle.ColumnIndex + 1 === item.ColumnIndex && lastEle.RowIndex + 1 === item.RowIndex) {
                    const firstEle = prevState[0];
                    const arr: Array<{ RowNumber: number, ColumnNumber: number, RowIndex: number, ColumnIndex: number }> = [];
                    for (let index = item.ColumnIndex - 1; index >= firstEle.ColumnIndex; index--) {
                        const obj: { RowNumber: number, ColumnNumber: number, RowIndex: number, ColumnIndex: number } = { RowIndex: item.RowIndex, RowNumber: item.RowNumber, ColumnIndex: index, ColumnNumber: item.ColumnNumber };
                        arr.push(obj);
                    }
                    for (let index = item.RowIndex - 1; index >= firstEle.RowIndex; index--) {
                        const obj: { RowNumber: number, ColumnNumber: number, RowIndex: number, ColumnIndex: number } = { RowIndex: index, RowNumber: item.RowNumber, ColumnIndex: item.ColumnIndex, ColumnNumber: item.ColumnNumber };
                        arr.push(obj);
                    }
                    return [...prevState, ...arr, item];
                }
                return [...prevState, item];
            })
        }
    }
    useEffect(() => {
        if (data) {
            const val = genrateContainerView(data);
            console.log(val);
            setContainerConfigration(val);
        }
    }, [data]);

    return (
        <div>
            <div className="flex justify-between">
                <p className="font-semibold text-[#212529] cursor-pointer hover:underline">Container {data?.Name}</p>
                <p className="font-semibold text-[#212529] cursor-pointer text-lg" onClick={reset}>
                    <i className="bi bi-arrow-counterclockwise" />
                </p>
            </div>
            <div className="flex flex-col items-center">
                {containerConfigration.length > 0 && containerConfigration.map(firstRow => {
                    return (
                        <div className="w-auto border-2 bg-[#e9ecef] rounded-lg m-1 border-[#6c757d] p-1">
                            {firstRow.map(row => (
                                <div className="flex w-full">
                                    {row.map((cols: Array<{ RowNumber: number, ColumnNumber: number, RowIndex: number, ColumnIndex: number }>, index: number) => {
                                        return (
                                            <>
                                                <div className="flex">
                                                    {cols.map((col: { RowNumber: number, ColumnNumber: number, RowIndex: number, ColumnIndex: number }) => (
                                                        <div className={`m-2 rounded-lg cursor-pointer  ${(selectedBoxs.filter(item => item.RowIndex === col.RowIndex && item.ColumnIndex === col.ColumnIndex && item.RowNumber === col.RowNumber && item.ColumnNumber === col.ColumnNumber)).length === 0 ? "bg-[#adb5bd] hover:bg-[#ced4da]" : "bg-[#6c757d] "}`} onMouseUp={mouseUpHandler}>
                                                            <p className="m-0 w-5 h-5" key={col.ColumnIndex * Math.random()} onMouseDown={() => mouseDownHandler(col)} onMouseEnter={() => mouseEnterHandler(col)}>
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                                {index < (row.length - 1) && <div className="border-r-2 border-[#6c757d]">
                                                </div>}
                                            </>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    )
                })}
                {containerConfigration.length === 0 && (
                    <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
            </div>
            <div className="flex flex-col sm:flex-row items-start p-4">
                <div className="font-semibold text-gray-700 ">
                    <p>Note:</p>
                </div>
                <div>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Each small box has dimensions of 200 cm in width and 200 cm in height.</li>
                        <li>Only select the boxes that contain available space.</li>
                        <li>The container has a depth of {data?.Depth}.</li>
                    </ul>
                </div>
            </div>
            <div className="flex justify-end mr-1">
                <Button onClick={() => changeTheStepHandler(selectedBoxs)} style={{ padding: 0, margin: 0, border: 0 }}>
                    <p className="font-medium border-2 text-[#212529] border-[#212529] rounded-lg p-2 hover:bg-[#212529] hover:text-white">Continue</p>
                </Button>
            </div>
        </div>
    )
};

export default ContainerView;