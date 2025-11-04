import React from "react";
import type IChatBox from "./IChatBox";
import { useLocation } from "react-router-dom";
import StartPage from "./StartPage/StartPage";
import CreateAccount from "./CreateAccount/CreateAccount";
import SignIn from "./SignIn/SignIn";
import ECom from "./ECom/ECom";

const ChatBox: React.FC<IChatBox> = () => {
    const url = useLocation().pathname;

    return (
        <div className="w-lg">
            {url === "/" && <StartPage />}
            {url === "/createAccount" && <CreateAccount />}
            {url === "/signIn" && <SignIn />}
            {url === "/E-Com" && <ECom />}
        </div>
    )
};

export default ChatBox;