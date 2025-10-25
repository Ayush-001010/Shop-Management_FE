import React, { useEffect, useRef, useState } from "react";
import type IQuery from "./IQuery";
import { Input } from "antd";
import { useGetTeamChatContext } from "../../TeamChat";

const Query: React.FC<IQuery> = ({ isSearchQuery, chatVisiableType, chatVisiableHandler }) => {
    const [searchStr, setSearchStr] = useState<string>("");
    const { chatPersonOrGroupSearchHandler, clearHandlerOfQuery } = useGetTeamChatContext();
    const isFirst = useRef<boolean>(true);

    const changeHandler = (e: any) => setSearchStr(e.target.value);

    useEffect(() => {
        const obj = setTimeout(() => {
            if (searchStr.trim().length > 0) {
                chatPersonOrGroupSearchHandler(searchStr);
            } else if (searchStr.length === 0) {
                if (!isFirst.current) {
                    clearHandlerOfQuery();
                }
                isFirst.current = false;
            }
        }, 2000);
        return () => clearTimeout(obj);
    }, [searchStr])
    return (
        <div className="w-sm m-0 flex justify-center">
            {!isSearchQuery && (
                <div className=" flex justify-between bg-[#e9ecef] h-10 w-full items-center rounded-2xl p-1">
                    <div>
                        <p onClick={() => chatVisiableHandler("All")} className={"m-0 w-26 text-center cursor-pointer " + (chatVisiableType === "All" ? "bg-white rounded-2xl text-[#004e98] font-semibold" : "text-[#6c757d] font-medium")}>All</p>
                    </div>
                    <div>
                        <p onClick={() => chatVisiableHandler("Personal")} className={"m-0 w-26 text-center cursor-pointer " + (chatVisiableType === "Personal" ? "bg-white rounded-2xl text-[#004e98] font-semibold" : "text-[#6c757d] font-medium")}>Personal</p>
                    </div>
                    <div>
                        <p onClick={() => chatVisiableHandler("Groups")} className={"m-0 w-26 text-center cursor-pointer " + (chatVisiableType === "Groups" ? "bg-white rounded-2xl text-[#004e98] font-semibold" : "text-[#6c757d] font-medium")}>Groups</p>
                    </div>
                </div>
            )}
            {isSearchQuery && <div className="w-full p-2">
                <Input.Search value={searchStr} onChange={changeHandler} />
            </div>}
        </div>
    )
};

export default Query;