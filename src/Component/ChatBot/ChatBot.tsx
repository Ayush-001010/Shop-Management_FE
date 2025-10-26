import React from "react";
import type IChatBot from "./IChatBot";
import { Popover } from "antd";
import ChatBox from "./ChatBox/ChatBox";

const ChatBot: React.FC<IChatBot> = () => {
    return (
        <div>
            <Popover content={<ChatBox />} trigger="click" style={{margin:"10px"}}>
                <div className="absolute bottom-0 right-0 m-4 rounded-full">
                    <p className="w-10 h-10 flex justify-center bg-[#495057] text-[#e9ecef] cursor-pointer hover:bg-[#343a40] hover:text-white transition delay-150 duration-300 ease-in-out rounded-full p-2 shadow-xl m-0 shadow-[#adb5bd]">
                        <i className="bi bi-chat-right-text-fill"></i>
                    </p>
                </div>
            </Popover>
        </div>
    )
};

export default ChatBot; ``