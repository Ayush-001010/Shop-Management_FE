import React, { useCallback, useRef, useState } from "react";
import type IFooter from "./IFooter";
import { Button, Input } from "antd";
import { useGetTeamChatContext } from "../../TeamChat";

const Footer: React.FC<IFooter> = () => {
    const [newMessage, setNewMessage] = useState<string>("");
    const [file, setFile] = useState();
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [imageURL, setImageURL] = useState<string>("");
    const { sendNewMessage, currentSelectPerson, replyChats, removeChatHandler } = useGetTeamChatContext();

    const openFileUpload = () => fileRef.current?.click();
    const fileHandler = (event: any) => {
        setFile(event.target?.files[0]);
        const url = URL.createObjectURL(event.target.files[0]);
        setImageURL(url);
    }
    const submitHandler = (event: any) => {
        event.preventDefault();
        if (newMessage.length > 0) {
            sendNewMessage(newMessage, currentSelectPerson?.userEmail || "", currentSelectPerson?.userName || "", currentSelectPerson?.GroupID, replyChats.map(item => item.ID), file);
            setNewMessage("");
        }
    }
    const changeHandler = useCallback((event: any) => {
        setNewMessage(event.target.value);
    }, []);
    return (
        <form onSubmit={submitHandler}>
            <div className="flex flex-col-reverse border-t border-[#dee2e6]">
                {/* Input Area */}
                <div className="flex w-full bg-white mt-1 p-1">
                    <div className="w-full">
                        <Input
                            onChange={changeHandler}
                            value={newMessage}
                            style={{ borderRadius: "20px", width: "100%" }}
                        />
                    </div>
                    <input
                        type="file"
                        style={{ display: "none" }}
                        ref={fileRef}
                        onChange={fileHandler}
                    />
                    <div>
                        <Button htmlType="submit" style={{ padding: 0, margin: 0, border: "none" }}>
                            <p className="my-0 rounded-4xl shadow-lg flex items-center justify-center bg-[#0077b6] w-10 h-10 ml-2" onClick={openFileUpload}>
                                <i className="bi bi-upload text-white m-0"></i>
                            </p>
                        </Button>
                    </div>
                    <div>
                        <Button htmlType="submit" style={{ padding: 0, margin: 0, border: "none" }}>
                            <p className="my-0 rounded-4xl shadow-lg flex items-center justify-center bg-[#0077b6] w-10 h-10 ml-2">
                                <i className="bi bi-send text-white m-0" />
                            </p>
                        </Button>
                    </div>
                </div>
                {replyChats.map((replyChat) => (
                    <div
                        key={replyChat.ID}
                        className="w-1/2 p-2 m-1 shadow-sm bg-[#e9ecef] rounded-lg"
                    >
                        <div>
                            <div className="flex justify-end">
                                <p
                                    className="my-0 border-2 shadow-sm border-[#343a40] text-[#343a40] hover:bg-[#343a40] hover:text-white cursor-pointer w-5 flex items-center justify-center rounded-2xl"
                                    onClick={() => removeChatHandler(replyChat)}
                                >
                                    <i className="bi bi-x-lg text-xs" />
                                </p>
                            </div>
                            <div>
                                <p className="my-0 text-sm text-[#212529] font-medium">{replyChat.Message}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {imageURL.length > 0 && <div className="w-120 h-70 m-1 p-1 bg-[#e9ecef] rounded-lg overflow-hidden">
                    <p className="my-0 flex justify-end text-[#212529] cursor-pointer" onClick={() => {setImageURL("") , setFile(undefined)}}>
                        <i className="bi bi-x-circle" />
                    </p>
                    <div className="w-full h-62 p-1 overflow-hidden">
                        <img className="w-full h-full object-cover" src={imageURL} alt="image" />
                    </div>
                </div>}
            </div>
        </form>

    )
};

export default Footer;