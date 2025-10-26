import React, { useEffect, useState } from "react";
import type ICreateAccount from "./ICreateAccount";
import { Button } from "antd";
import useChatBoxAction from "../../../../Services/CustomHook/useChatBoxAction";
import type { IChatMessageInterface, IChatMessageOptionInterface } from "../../../../Services/Interface/ChatBotInterface";
import { useSelector } from "react-redux";
import type { IChatBoxReduxStateInterface } from "../../../../Redux/ChatBox";

const CreateAccount: React.FC<ICreateAccount> = () => {
    const { genrateChatMessage } = useChatBoxAction();
    const [chats, setChats] = useState<Array<IChatMessageInterface>>([]);
    const { currentErrors , currentFormField }: IChatBoxReduxStateInterface = useSelector((state: any) => state.chatbox);


    const optionClickHandler = (option: IChatMessageOptionInterface) => {
        console.log(currentFormField);
        const arr = option?.callbackFunc(chats, option.text , currentErrors , currentFormField);
        console.log(arr);
        setChats([...arr]);
    }
    useEffect(() => {
        const arr = genrateChatMessage();
        setChats(arr || []);
    }, [])

    return (
        <div className="p-1 overflow-auto h-[500px]">
            {chats.map((chat: IChatMessageInterface , index : number) => {
                const { text, options, by, isResponse } = chat;
                return (
                    <>
                        <div className={`w-full mt-2 ${by === "User" ? "flex justify-end items-center" : " flex items-center"}`}>
                            {by === "User" && <p className="m-0 font-medium  text-sm text-center p-1 text-[#495057] w-40">
                                You Selected :
                            </p>}
                            {(by === "Server" && isResponse) && <p className="m-0 font-medium w-26 text-sm text-center p-1 text-[#495057] w-60">
                                Response :
                            </p>}
                            <p className={`font-normal text-[#212529] text-sm m-0 ${by === "User" ? "bg-[#495057] text-white p-1 rounded-lg shadow-sm" : ""}`}>
                                {text}
                            </p>
                        </div>
                        <div className="flex flex-col justify-between items-start ">
                            {options?.map((option) => {
                                if (option.type === "function") {
                                    return <>
                                        <Button style={{ margin: "1px", padding: 0, boxShadow: "none", border: "none" }} disabled={index !== chats.length - 1} onClick={() => optionClickHandler(option)}>
                                            <p className="text-[#212529] bg-[#e9ecef] m-0 border-none p-1 font-semibold  rounded-lg mt-2">
                                                {option.text}
                                            </p>
                                        </Button>
                                    </>
                                }
                            })}
                        </div>
                        <hr />
                    </>
                )
            })}

        </div >
    )
};

export default CreateAccount;