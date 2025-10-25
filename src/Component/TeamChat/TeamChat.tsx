import React, { createContext, useContext, useEffect, useState } from "react";
import type ITeamChat from "./ITeamChat";
import UserPannel from "./UserPannel/UserPannel";
import useTeamChatAction from "../../Services/CustomHook/useTeamChatAction";
import ChatBody from "./ChatBody/ChatBody";
import type { IChatInterface, IChatUserOrGroupInterface } from "../../Services/Interface/TeamChatInterface";
import CreateGroup from "./CreateGroup/CreateGroup";
import Details from "./Details/Details";

interface ITeamChatContext {
    chatPersonDetails: Array<IChatUserOrGroupInterface>;
    pinnedChatPersonDetails: Array<IChatUserOrGroupInterface>;
    unPinnedUser: (pinnedPerosnID: string | null, groupID: string | null) => Promise<any>;
    pinnedUser: (pinnedPerosnID: string | null, groupID: string | null) => Promise<any>;
    changeSelectedUser: (person: any) => void;
    currentSelectPerson: IChatUserOrGroupInterface | null;
    chats: Array<IChatInterface>;
    sendNewMessage: (message: string, toEmailID: string, RecivedByName: string, groupID?: string, ReplyChatID?: Array<number>, file?: any) => void;
    openCreateGroupFunc: () => void;
    chatsLoading: boolean;
    closeDetailsSectionHandler: () => void;
    openDetailsSectionHandler: () => void;
    deleteAllChat: (selectedPersonEmailID: string) => Promise<{ success: boolean, data: any }>;
    deleteSingleChat: (type: "DeleteByEveryone" | "DeleteByMe", ChatID: number, selectedPersonEmailID: string) => Promise<{ success: boolean, data: any }>;
    replyChats: Array<IChatInterface>;
    addReplyChatHandler: (chatDetails: IChatInterface) => void;
    removeChatHandler: (chatDetails: IChatInterface) => void;
    chatTypeFilter: (type: "All" | "Personal" | "Groups") => void;
    chatPersonOrGroupSearchHandler: (searchStr: string) => void;
    clearHandlerOfQuery: () => void;
}

const TeamChatContext = createContext<ITeamChatContext | undefined>(undefined);

export const useGetTeamChatContext = () => {
    const context = useContext(TeamChatContext);
    if (!context) {
        throw new Error("useGetTeamChatContext must be used within a TeamChatProvider");
    }
    return context;
};

const TeamChat: React.FC<ITeamChat> = () => {
    const [currentSelectPerson, setCurrentSelectPerson] = useState<IChatUserOrGroupInterface | null>(null);
    const { chatPersonDetails, pinnedChatPersonDetails, pinnedUser, unPinnedUser, getOldChats, chats, sendNewMessage, createGroup, chatsLoading, deleteAllChat, deleteSingleChat, chatTypeFilter, chatPersonOrGroupSearchHandler, clearHandlerOfQuery } = useTeamChatAction(currentSelectPerson);
    const [openCreateGroup, setOpenCreateGroup] = useState<boolean>(false);
    const [openDetailsSection, setOpenDetailsSection] = useState<boolean>(false);
    const [replyChats, setReplyChats] = useState<Array<IChatInterface>>([]);

    const addReplyChatHandler = (chatDetails: IChatInterface) => setReplyChats((prevState) => {
        return [...prevState, chatDetails];
    })
    const removeChatHandler = (chatDetails: IChatInterface) => setReplyChats((prevState) => {
        prevState = prevState.filter(item => item.ID !== chatDetails.ID);
        return [...prevState];
    })
    const closeDetailsSectionHandler = () => setOpenDetailsSection(false);
    const openDetailsSectionHandler = () => setOpenDetailsSection(true);
    const openCreateGroupFunc = () => setOpenCreateGroup(true);
    const closeCreateGroupFunc = () => setOpenCreateGroup(false);
    const changeSelectedUser = (person: any) => {
        setCurrentSelectPerson(person);
    }

    useEffect(() => {
        const obj = setTimeout(() => {
            if (currentSelectPerson)
                getOldChats(currentSelectPerson.userEmail || "", currentSelectPerson.GroupID);
        }, 500);
        return () => clearTimeout(obj);
    }, [currentSelectPerson])

    return (
        <TeamChatContext.Provider value={{ chatPersonDetails, pinnedChatPersonDetails: pinnedChatPersonDetails, pinnedUser, unPinnedUser, changeSelectedUser, currentSelectPerson, chats, sendNewMessage, openCreateGroupFunc, chatsLoading, closeDetailsSectionHandler, openDetailsSectionHandler, deleteAllChat, deleteSingleChat, replyChats, removeChatHandler, addReplyChatHandler, chatTypeFilter, chatPersonOrGroupSearchHandler, clearHandlerOfQuery }}>
            <div className="flex bg-[#e9ecef] p-2 h-190">
                <UserPannel />
                <ChatBody />
                {openDetailsSection && <Details />}
            </div>
            <CreateGroup open={openCreateGroup} closeCreateGroup={closeCreateGroupFunc} submitHandlerFunc={createGroup} />
        </TeamChatContext.Provider>
    )
};

export default TeamChat;