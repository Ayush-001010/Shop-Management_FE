import React, { useState } from "react";
import type IBoardQuerying from "./IBoardQuerying";
import { Button } from "antd";
import BoardFilter from "../BoardFilter/BoardFilter";
import BoardSearch from "../BoardSearch/BoardSearch";
import { useGetDashboardContextValue } from "../../Dashboard";
import styles from "../Board.module.css";

const BoardQuerying: React.FC<IBoardQuerying> = ({ header }) => {
    const [isOpen, setIsOpen] = useState<"search" | "filter" | null>(null);
    const contextVal = useGetDashboardContextValue();
    const searchHandlerOfBoard = contextVal?.searchHandler

    const isOpenFunc = (type: "filter" | "search" | null) => {
        setIsOpen(type);
    }
    const clearHandler = () => {
        if(searchHandlerOfBoard){
            searchHandlerOfBoard("","New");
        }
    }
    const firstContant = (
        <div>
            <div className="w-full m-1">
                <Button className={`w-full  font-semibold ${styles.boardPopOverButtonCss}`}  onClick={() => isOpenFunc("search")}>
                    Search
                </Button>
            </div>
            <div className="w-full m-1">
                <Button className={`w-full  font-semibold ${styles.boardPopOverButtonCss}`} onClick={() => isOpenFunc("filter")}>
                    Filter
                </Button>
            </div>
            <div className="w-full m-1">
                <Button className={`w-full font-semibold ${styles.boardPopOverButtonCss}`} onClick={clearHandler}>
                    Clear
                </Button>
            </div>
        </div>
    )
    return (
        <div>
            {!isOpen && firstContant}
            {isOpen === "filter" && <BoardFilter header={header} isOpenFunc={isOpenFunc} />}
            {isOpen === "search" && <BoardSearch header={header} isOpenFunc={isOpenFunc} />}
        </div>
    )
};

export default BoardQuerying;