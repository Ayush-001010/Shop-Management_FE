import React, { useState } from "react";
import type IHeader from "./IHeader";
import { useGetTeamChatContext } from "../../TeamChat";
import CommonConfig from "../../../../Services/Config/CommonConfig";
import type { IChatUserOrGroupInterface } from "../../../../Services/Interface/TeamChatInterface";
import { Button, message, Popover } from "antd";
import CustomConfirmationModal from "../../../UI/CustomConfirmationModal/CustomConfirmationModal";

const Header: React.FC<IHeader> = () => {
    const [messageAPI, contextHandler] = message.useMessage();
    const { currentSelectPerson, openDetailsSectionHandler, deleteAllChat } = useGetTeamChatContext();
    const { userImageURL, userName, userEmail , GroupImageURL  , GroupName } = currentSelectPerson as IChatUserOrGroupInterface;
    const [openConfirmation, setOpenConfirmation] = useState<{ open: boolean, text: string, btn1Text: string, btn2Text: string }>({ open: false, text: "", btn1Text: "", btn2Text: "" });

    const deleteAllChatHandler = async () => {
        messageAPI.destroy();
        messageAPI.loading(CommonConfig.loadingMessage);
        const response = await deleteAllChat(currentSelectPerson?.userEmail || "");
        setOpenConfirmation({ open: false, text: "", btn1Text: "", btn2Text: "" });
        messageAPI.destroy();
        if (response.success) {
            messageAPI.success({ content: "All chats have been deleted." })
        } else {
            messageAPI.error(CommonConfig.errorMessage);
        }
    }
    const openAllChatDeleteConfirmation = () => setOpenConfirmation({ open: true, text: "Do you confirm the deletion of all chat history?", btn1Text: "No", btn2Text: "Yes, Delete All" });
    const closeOpenConfirmationHandler = () => setOpenConfirmation({ open: false, text: "", btn1Text: "", btn2Text: "" });
    const popOverContext = <div>
        <div>
            <Button style={{ padding: 0, border: "none", margin: 0, backgroundColor: "transparent" }} onClick={openAllChatDeleteConfirmation}>
                <p className=" border-2 border-[#212529] p-2 rounded-xl text-[#212529] font-medium cursor-pointer hover:bg-[#212529] hover:text-white transition delay-150 duration-300">
                    Delete All Chat
                </p>
            </Button>
        </div>
    </div>

    return (
        <div className="flex justify-between border-b-1  border-[#dee2e6]">
            {contextHandler}
            <div className="flex items-center p-2  bg-white rounded-t-2xl cursor-pointer" onClick={openDetailsSectionHandler}>
                <div className="m-0 w-20 h-20 rounded-full overflow-hidden">
                    <img className="w-full h-full object-cove" src={ (userImageURL || GroupImageURL) ? userImageURL || GroupImageURL : CommonConfig.blankUserImage} alt="user" />
                </div>
                <div className="ml-2">
                    <p className="my-0 font-semibold text-[#212529]">{userName || GroupName}</p>
                    <p className="my-0 font-light text-sm text-[#6c757d]">{userEmail}</p>
                </div>
            </div>
            <div className="flex justify-center items-center p-1 mr-2">
                <Popover content={popOverContext} trigger={"click"}>
                    <p className="my-0 text-center text-[#212529] hover:bg-[#212529] rounded-4xl w-10 h-10 hover:text-white flex justify-center items-center cursor-pointer">
                        <i className="bi bi-three-dots-vertical" />
                    </p>
                </Popover>
            </div>
            <CustomConfirmationModal openModal={openConfirmation.open} cancelButtonText={openConfirmation.btn1Text} confirmButtonText={openConfirmation.btn2Text} confirmationText={openConfirmation.text} closeHandler={closeOpenConfirmationHandler} confirmationHandler={deleteAllChatHandler} />
        </div>
    )
};

export default Header;