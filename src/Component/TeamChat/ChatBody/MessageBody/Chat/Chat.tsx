import React, { useState } from "react";
import type IChat from "./IChat";
import moment from "moment";
import { useSelector } from "react-redux";
import { Button, message, Popover } from "antd";
import CustomConfirmationModal from "../../../../UI/CustomConfirmationModal/CustomConfirmationModal";
import { useGetTeamChatContext } from "../../../TeamChat";
import CommonConfig from "../../../../../Services/Config/CommonConfig";

const Chat: React.FC<IChat> = ({ details, lastSendBy, sendBy, replyMessage }) => {
    const { deleteSingleChat, currentSelectPerson, addReplyChatHandler } = useGetTeamChatContext();
    const { userEmail, userName } = useSelector((state: any) => state.user);
    const [openConfirmation, setOpenConfirmation] = useState<{ open: boolean, text: string, btn1Text: string, btn2Text: string }>({ open: false, text: "", btn1Text: "", btn2Text: "" });
    const [deleteType, setDeleteType] = useState<"Me" | "Everyone" | "">("");
    const [messageAPI, contextHandler] = message.useMessage();

    const copyTextHandler = async () => {
        try {
            await navigator.clipboard.writeText(details.Message);
            messageAPI.success("Message copied to clipboard.");
        } catch (err) {
            messageAPI.error("Failed to copy message.");
        }
    }
    const closeOpenConfirmationHandler = () => setOpenConfirmation({ open: false, text: "", btn1Text: "", btn2Text: "" });
    const confirmationHandler = async () => {
        closeOpenConfirmationHandler();
        messageAPI.destroy();
        messageAPI.loading(CommonConfig.loadingMessage);
        switch (deleteType) {
            case "Me": {
                const response = await deleteSingleChat("DeleteByMe", details.ID, currentSelectPerson?.userEmail || "");
                messageAPI.destroy();
                if (response.success) {
                    messageAPI.success({ content: "The message has been removed from my device." });
                } else {
                    messageAPI.error(CommonConfig.errorMessage);
                }
                break;
            }
            case "Everyone": {
                const response = await deleteSingleChat("DeleteByEveryone", details.ID, currentSelectPerson?.userEmail || "");
                messageAPI.destroy();
                if (response.success) {
                    messageAPI.success({ content: "Message successfully deleted for everyone." });
                } else {
                    messageAPI.error(CommonConfig.errorMessage);
                }
                break;
            }
        }
    }
    const openConfirmationHandler = (type: "Me" | "Everyone") => {
        setDeleteType(type);
        switch (type) {
            case "Me": {
                setOpenConfirmation({ open: true, text: "Do you really want to remove this chat from your device?", btn1Text: "No", btn2Text: "Yes, Delete From Me" });
                break;
            }
            case "Everyone": {
                setOpenConfirmation({ open: true, text: "Are you sure you want to delete this chat for everyone?", btn1Text: "No", btn2Text: "Yes, Delete From Everyone" });
                break;
            }
        }
    }
    const PopoverContant = (isSendBy: boolean) => {
        return (
            <div>
                <div className="h-10">
                    <Button onClick={() => openConfirmationHandler("Me")} style={{ padding: 0, margin: 0, border: "none", boxShadow: "none" }}>
                        <p className="my-0 w-40 border-2 border-[#212529] text-[#212529] hover:bg-[#212529] hover:text-white rounded-lg p-2 cursor-pointer">Delete By Me</p>
                    </Button>
                </div>
                {isSendBy && <div className="mt-2 h-10">
                    <Button onClick={() => openConfirmationHandler("Everyone")} style={{ padding: 0, margin: 0, border: "none", boxShadow: "none" }}>
                        <p className="my-0 w-40 border-2 border-[#212529] text-[#212529] hover:bg-[#212529] hover:text-white rounded-lg p-2 cursor-pointer">Delete By Everyone</p>
                    </Button>
                </div>}
                <div className="mt-2 h-10">
                    <Button onClick={copyTextHandler} style={{ padding: 0, margin: 0, border: "none", boxShadow: "none" }}>
                        <p className="my-0 w-40 border-2 border-[#212529] text-[#212529] hover:bg-[#212529] hover:text-white rounded-lg p-2 cursor-pointer">Copy Text</p>
                    </Button>
                </div>
                <div className="mt-2 h-10">
                    <Button onClick={() => addReplyChatHandler(details)} style={{ padding: 0, margin: 0, border: "none", boxShadow: "none" }}>
                        <p className="my-0 w-40 border-2 border-[#212529] text-[#212529] hover:bg-[#212529] hover:text-white rounded-lg p-2 cursor-pointer">Reply</p>
                    </Button>
                </div>
            </div>
        )
    }
    return (
        <div className={"w-full p-1 " + (details.SendBy === userEmail ? "flex flex-col items-end justify-end" : "flex flex-col items-start justify-start")}>
            {contextHandler}
            <div>
                {lastSendBy !== sendBy && (
                    <div className="mx-2 my-1 flex justify-start">
                        <p className="m-0 font-semibold w-full text-[#212529]">{sendBy === userName ? "You" : sendBy}</p>
                    </div>
                )}
                {replyMessage?.map((message) => <div>
                    <p>{message.Message}</p>
                </div>)}
                <div className="flex">
                    {details.SendBy === userEmail && <div>
                        <Popover content={() => PopoverContant(true)} trigger={"click"}>
                            <p className="my-0 mr-2 h-full flex items-center cursor-pointer text-[#212529] hover:text-[#6c757d]">
                                <i className="bi bi-three-dots-vertical" />
                            </p>
                        </Popover>
                    </div>
                    }
                    <div className="bg-[#ced4da] w-fit p-2 rounded-2xl shadow-sm">
                        {details.FileURL && <img src={details.FileURL} alt="message" />}
                        <div className="flex items-end justify-end">
                            <p className="text-lg m-0 text-[#212529] font-medium">{details.Message}</p>
                            <p className="my-0 text-xs ml-4 text-[#6c757d]">{moment(details.createdAt).format("DD/MM/YYYY HH:mm")}</p>
                        </div>
                    </div>
                    {details.SendBy !== userEmail && <div>
                        <Popover content={() => PopoverContant(false)} trigger={"click"}>
                            <p>
                                <i className="bi bi-three-dots-vertical" />
                            </p>
                        </Popover>
                    </div>
                    }
                </div>
            </div>
            <CustomConfirmationModal openModal={openConfirmation.open} cancelButtonText={openConfirmation.btn1Text} confirmButtonText={openConfirmation.btn2Text} confirmationText={openConfirmation.text} closeHandler={closeOpenConfirmationHandler} confirmationHandler={confirmationHandler} />
        </div>
    )
};

export default Chat;