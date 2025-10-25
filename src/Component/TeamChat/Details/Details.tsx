import React from "react";
import type IDetails from "./IDetails";
import { useGetTeamChatContext } from "../TeamChat";
import type { IChatUserOrGroupInterface } from "../../../Services/Interface/TeamChatInterface";
import CommonConfig from "../../../Services/Config/CommonConfig";

const Details: React.FC<IDetails> = () => {
    const { currentSelectPerson , closeDetailsSectionHandler } = useGetTeamChatContext();
    const { userName, userImageURL, userEmail, About } = currentSelectPerson as IChatUserOrGroupInterface;

    return (
        <div className="bg-white rounded-2xl w-180 h-fit">
            <div className="border-b-1 border-[#adb5bd] flex p-2 w-full h-20 justify-between items-center">
                <p className="my-0 font-medium text-[#212529]">{userName ? "User Details" : "Group Details"}</p>
                <p onClick={closeDetailsSectionHandler} className="my-0 cursor-pointer hover:bg-[#212529] rounded-4xl hover:text-white w-10 h-10 flex justify-center items-center"><i className="bi bi-x-lg" /></p>
            </div>
            <div className="border-b-1 border-[#adb5bd] p-3 flex flex-col jusfti-center items-center">
                <div className="m-0 w-36 h-36 rounded-full overflow-hidden">
                    <img className="w-full h-full object-cove" src={userImageURL ? userImageURL : CommonConfig.blankUserImage} alt="user" />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p className="my-0 text-xl text-[#212529] font-medium">{userName}</p>
                    <p className="my-0 text-sm text-[#6c757d] font-thin">{userEmail}</p>
                </div>
            </div>
            <div className="p-3">
                <p className=" text-lg text-[#212529] font-medium">About</p>
                <p className="my-0 text-sm font-normal text-[#495057]">{About}</p>
            </div>
        </div>
    )
};

export default Details;