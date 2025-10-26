import React from "react";
import type IChatBox from "./IChatBox";
import { useLocation } from "react-router-dom";
import StartPage from "./StartPage/StartPage";
import CreateAccount from "./CreateAccount/CreateAccount";

const ChatBox: React.FC<IChatBox> = () => {
    const url = useLocation().pathname;

    return (
        <div className="w-lg">
            {url === "/" && <StartPage />}
            {url === "/createAccount" && <CreateAccount />}
        </div>
    )
};

export default ChatBox;