import React from "react";
import type IHeader from "./IHeader";
import { useSelector } from "react-redux";
import CommonConfig from "../../../../Services/Config/CommonConfig";
import { Tooltip } from "antd";
import { useGetTeamChatContext } from "../../TeamChat";

const Header: React.FC<IHeader> = ({ changeSearchQuery, isSearchQuery }) => {
    const { userImage, userName, About } = useSelector((state: any) => state.user);
    const { openCreateGroupFunc } = useGetTeamChatContext();

    return (
        <div className="flex justify-between p-2">
            <div className="flex items-center justify-start">
                <div className="m-0 w-15 h-15 rounded-full overflow-hidden">
                    <img className="w-full h-full object-cover" src={(!userImage || userImage.trim().length === 0) ? CommonConfig.blankUserImage : userImage} alt="User" />
                </div>
                <div className="flex flex-col items-start justify-start">
                    <p className="ml-3 text-center my-0 font-medium text-[#212529]">{userName}</p>
                    <p className="my-0 ml-3 text-[#6c757d] font-light text-xs">{About?.slice(0, 30)} ...</p>
                </div>
            </div>
            <div className="flex items-center justify-start">
                <Tooltip title={!isSearchQuery ? "Search" : "Filter"}>
                    <p className="my-0 cursor-pointer" onClick={changeSearchQuery}>
                        {!isSearchQuery && <i className="bi bi-search text-[#6c757d]" />}
                        {isSearchQuery && <i className="bi bi-filter-circle text-[#6c757d]" />}
                    </p>
                </Tooltip>
                <Tooltip title="Create Group">
                    <p className="my-0 cursor-pointer" onClick={openCreateGroupFunc}>
                        <i className="bi bi-pencil-square text-[#6c757d] ml-2" />
                    </p>
                </Tooltip>
            </div>
        </div>
    )
};

export default Header;