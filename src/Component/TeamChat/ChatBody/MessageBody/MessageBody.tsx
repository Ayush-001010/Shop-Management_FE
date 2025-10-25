import React from "react";
import type IMessageBody from "./IMessageBody";
import { useGetTeamChatContext } from "../../TeamChat";
import Chat from "./Chat/Chat";
import ChatLoader from "./ChatLoader/ChatLoader";

const MessageBody: React.FC<IMessageBody> = () => {
    const { chats, chatsLoading } = useGetTeamChatContext();

    return (
        <div className="flex-1 overflow-y-auto bg-[#f8f9fa]">
            {chatsLoading && <ChatLoader />}
            {!chatsLoading && chats.map((chatDetails, index) => <>
                <Chat details={chatDetails} sendBy={chatDetails.SendByName} lastSendBy={index === 0 ? "" : chats[index - 1].SendByName} replyMessage={chatDetails.ReplyChatID?.length === 0 ? [] : chatDetails.ReplyChatID?.split(",").map(item => chats[Number(item)])} />
            </>)}
        </div>
    )
};

export default MessageBody;