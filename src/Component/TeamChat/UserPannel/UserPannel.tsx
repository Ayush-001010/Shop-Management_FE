import React, { useCallback, useEffect, useRef, useState } from "react";
import type IUserPannel from "./IUserPannel";
import Header from "./Header/Header";
import Query from "./Query/Query";
import Body from "./Body/Body";
import { useGetTeamChatContext } from "../TeamChat";

const UserPannel: React.FC<IUserPannel> = () => {
    const { chatTypeFilter } = useGetTeamChatContext();
    const [searchQuery, serSearchQuery] = useState<boolean>(false);
    const [chatVisiableType, setChatVisbleType] = useState<"All" | "Groups" | "Personal">("All");
    const isFirst = useRef<boolean>(true);

    const changeSearchQuery = useCallback(() => {
        setChatVisbleType("All");
        serSearchQuery((prevState) => !prevState);
    }, []);
    const changeChatTypeHandler = useCallback((type: "All" | "Groups" | "Personal") => {
        setChatVisbleType(type);
    }, [])

    useEffect(() => {
        const obj = setTimeout(() => {
            if (!isFirst.current) {
                chatTypeFilter(chatVisiableType);
            }
            isFirst.current = false;
        }, 1000);
        return () => clearTimeout(obj);
    }, [chatVisiableType])

    return (
        <div className="bg-white w-md h-180 rounded-2xl p-1">
            <Header changeSearchQuery={changeSearchQuery} isSearchQuery={searchQuery} />
            <Query isSearchQuery={searchQuery} chatVisiableHandler={changeChatTypeHandler} chatVisiableType={chatVisiableType} />
            <Body />
        </div>
    )
};

export default UserPannel;