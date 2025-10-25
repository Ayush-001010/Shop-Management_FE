import React, { useEffect, useState } from "react";
import type IBoardSearch from "./IBoardSearch";
import { Button, Input } from "antd";
import { useGetDashboardContextValue } from "../../Dashboard";
import styles from "../Board.module.css";

const BoardSearch: React.FC<IBoardSearch> = ({ header , isOpenFunc }) => {
    const [searchStr, setSearchStr] = useState<string>("");
    const contextVal = useGetDashboardContextValue();
    const searchHandlerOfBoard = contextVal?.searchHandler;

    const changeHandler = ({ target }: any) => {
        setSearchStr(target.value);
    }
    useEffect(() => {
        const obj = setTimeout(() => {
            if (searchHandlerOfBoard) {
                switch (header) {
                    case "New": {
                        searchHandlerOfBoard(searchStr, "New");
                    }
                }
            }
        }, 2000);
        return () => clearTimeout(obj);
    }, [searchStr])
    return (
        <div>
            <Button className={`w-full m-1 font-semibold ${styles.boardPopOverButtonCss}`} onClick={()=>isOpenFunc(null)}>Back</Button>
            <p className={`m-1 text-sm ${styles.boardSearchLabelCss}`}>Search</p>
            <Input.Search onChange={changeHandler} />
        </div>
    )
};

export default BoardSearch;