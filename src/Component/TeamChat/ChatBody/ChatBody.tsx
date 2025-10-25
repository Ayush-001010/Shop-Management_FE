import React from "react";
import type IChatBody from "./IChatBody";
import { useGetTeamChatContext } from "../TeamChat";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import MessageBody from "./MessageBody/MessageBody";

const ChatBody: React.FC<IChatBody> = () => {
    const { currentSelectPerson } = useGetTeamChatContext();

    return (
        <div className="w-full h-180 bg-white mx-2 rounded-2xl border-2 border-[#dee2e6]">
            {currentSelectPerson && (
                <>
                    <Header />
                    <div className="flex flex-col h-150">
                        <MessageBody />
                        <Footer />
                    </div>
                </>
            )}
        </div>
    )
};

export default ChatBody;