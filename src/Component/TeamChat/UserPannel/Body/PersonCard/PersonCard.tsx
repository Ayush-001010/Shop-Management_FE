import React from "react";
import type IPersonCard from "./IPersonCard";
import CommonConfig from "../../../../../Services/Config/CommonConfig";
import { useGetTeamChatContext } from "../../../TeamChat";

const PersonCard: React.FC<IPersonCard> = ({ personDetails, isPinned }) => {
    const { userImageURL, userName, About, GroupName, GroupAbout, GroupImageURL, NoOfNewMessage } = personDetails;
    const { pinnedUser, unPinnedUser, currentSelectPerson, changeSelectedUser } = useGetTeamChatContext();

    const pinnedHandler = async () => {
        const personID = (!personDetails?.GroupID || personDetails?.GroupID === "") ? personDetails.ID.toString() : null;
        const groupID = personDetails?.GroupID ? personDetails.ID.toString() : null;
        await pinnedUser(personID, groupID);
    }
    const unPinnedHandler = async () => {
        const personID = (!personDetails?.GroupID || personDetails?.GroupID === "") ? personDetails.ID.toString() : null;
        const groupID = personDetails?.GroupID ? personDetails.ID.toString() : null;
        await unPinnedUser(personID, groupID);
    }
    const selectPersonHandler = () => {
        changeSelectedUser(personDetails);
    }

    return (
        <div className={"flex justify-between p-1 my-1 cursor-pointer " + (personDetails.ID === currentSelectPerson?.ID ? "bg-[#dee2e6]" : "")} onClick={selectPersonHandler}>
            <div className="flex">
                <div className="m-0 w-10 h-10 rounded-full overflow-hidden flex items-center">
                    <img className="w-full h-full object-cover" src={((!userImageURL && !GroupImageURL) || (userImageURL?.trim().length === 0 && GroupImageURL?.trim().length === 0)) ? CommonConfig.blankUserImage : userImageURL || GroupImageURL} alt="User" />
                </div>
                <div className="ml-2 flex flex-col">
                    <p className="font-medium m-0 text-[#212529]">{userName || GroupName} {NoOfNewMessage && <span className="rounded-full text-white bg-[#495057] w-full h-full text-xs p-1">{NoOfNewMessage}</span>} </p>
                    <p className="m-0 font-light text-[#6c757d]">{About?.slice(0, 35) || GroupAbout?.slice(0, 35)} ...</p>
                </div>
            </div>
            <div className="flex items-center">
                {!isPinned && <p className="m-0" onClick={pinnedHandler}><i className="bi bi-pin" /></p>}
                {isPinned && <p className="m-0" onClick={unPinnedHandler}><i className="bi bi-pin-fill" /></p>}
            </div>
        </div>
    )
};

export default PersonCard;