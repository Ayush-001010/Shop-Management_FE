import React from "react";
import type IMessageGroup from "./IMessageGroup";
import PersonCard from "../PersonCard/PersonCard";
import { useGetTeamChatContext } from "../../../TeamChat";

const MessageGroup: React.FC<IMessageGroup> = () => {
    const { chatPersonDetails } = useGetTeamChatContext();

    return (
        <div className="mt-2">
            <div className="flex justify-between">
                <p className="text-[#6c757d] font-normal">Messages</p>
                <p><i className="bi bi-chat-dots text-[#6c757d]" /></p>
            </div>
            <div>
                {chatPersonDetails.length === 0 && <div>
                    <p className="my-0 text-sm text-[#adb5bd] font-medium text-center">No person was found.</p>
                </div>}
                {chatPersonDetails.map((person: any) => {
                    return <PersonCard personDetails={person} />
                })}
            </div>
        </div>
    )
};

export default MessageGroup;