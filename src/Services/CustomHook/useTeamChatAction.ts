import { useSelector } from "react-redux";
import APICallingServices from "../APICallingService";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import type { IChatInterface, IChatUserOrGroupInterface } from "../Interface/TeamChatInterface";
import CommonConfig from "../Config/CommonConfig";

const useTeamChatAction = (currentUser: IChatUserOrGroupInterface | null) => {
    const { userID, userEmail, userName } = useSelector((state: any) => state.user);
    const [allChatPersonDetails, setAllChatPersonDetails] = useState<Array<IChatUserOrGroupInterface>>([]);
    const [allPinnedChatPersonDetails, setAllPinnedChatPersonDetails] = useState<Array<IChatUserOrGroupInterface>>([]);
    const [chatPersonDetails, setChatPersonDetails] = useState<Array<IChatUserOrGroupInterface>>([]);
    const [pinnedChatPersonDetails, setPinnedChatPersonDetails] = useState<Array<IChatUserOrGroupInterface>>([]);
    const [chats, setChats] = useState<Array<IChatInterface>>([]);
    const [chatsLoading, setChatsLoading] = useState<boolean>(false);
    const socket = io(CommonConfig.socketBaseURL);

    const chatPersonOrGroupSearchHandler = (searchStr: string) => {
        setChatPersonDetails(() => {
            const arr = allChatPersonDetails.filter((item) => item?.userName?.toLowerCase().includes(searchStr.toLowerCase()) || item?.GroupName?.toLowerCase().includes(searchStr.toLowerCase()));
            return [...arr];
        });
        setPinnedChatPersonDetails(() => {
            const arr = allPinnedChatPersonDetails.filter((item) => item?.userName?.toLowerCase().includes(searchStr.toLowerCase()) || item?.GroupName?.toLowerCase().includes(searchStr.toLowerCase()));
            return [...arr];
        })
    }
    const clearHandlerOfQuery = () => {
        setChatPersonDetails(allChatPersonDetails);
        setPinnedChatPersonDetails(allPinnedChatPersonDetails);
    }
    const chatTypeFilter = (type: "All" | "Personal" | "Groups") => {
        switch (type) {
            case "All": {
                setPinnedChatPersonDetails(allPinnedChatPersonDetails);
                setChatPersonDetails(allChatPersonDetails);
                break;
            }
            case "Groups": {
                setPinnedChatPersonDetails(() => {
                    const arr = allPinnedChatPersonDetails.filter((item) => item.GroupID && item.GroupID?.length > 0);
                    return [...arr];
                });
                setChatPersonDetails(() => {
                    const arr = allChatPersonDetails.filter((item) => item.GroupID && item.GroupID.length > 0);
                    return [...arr];
                });
                break;
            }
            case "Personal": {
                setPinnedChatPersonDetails(() => {
                    const arr = allPinnedChatPersonDetails.filter((item) => !item.GroupID || item.GroupID?.length === 0);
                    return [...arr];
                });
                setChatPersonDetails(() => {
                    const arr = allChatPersonDetails.filter((item) => !item.GroupID || item.GroupID.length === 0);
                    return [...arr];
                });
                break;
            }
        }
    }
    const getUsersDetails = async () => {
        try {
            const apiObj = new APICallingServices();
            const response = await apiObj.getDataFromBackend("/teamChat/getPersonsDetails", { userID });
            if (response.success) {
                const { personDetails, pinnedPersonDetails } = response.data;
                const grpIds: Array<string> = [];
                for (const grp of personDetails) {
                    if (grp?.GroupID)
                        grpIds.push(grp.GroupID);
                }
                for (const grp of pinnedPersonDetails) {
                    if (grp?.GroupID)
                        grpIds.push(grp.GroupID);
                }
                if (grpIds.length > 0) {
                    socket.emit("join-group", grpIds);
                }
                setChatPersonDetails([...personDetails]);
                setPinnedChatPersonDetails(pinnedPersonDetails);
                setAllPinnedChatPersonDetails(pinnedPersonDetails);
                setAllChatPersonDetails([...personDetails]);
            } else {
                setChatPersonDetails([]);
            }
        } catch (error) {
            return;
        }
    };
    const pinnedUser = async (pinnedPerosnID: string | null, groupID: string | null) => {
        try {
            const apiObj = new APICallingServices();
            const response = await apiObj.getDataFromBackend("/teamChat/pinnedChat", { userID, pinnedPerosnID, groupID });
            if (response.success) {
                await getUsersDetails();
            }
        } catch (error) {
            console.log("Error while pinning user", error);
            return { success: false };
        }
    };
    const unPinnedUser = async (pinnedPerosnID: string | null, groupID: string | null) => {
        try {
            const apiObj = new APICallingServices();
            const response = await apiObj.getDataFromBackend("/teamChat/unPinnedChat", { userID, pinnedPerosnID, groupID });
            if (response.success) {
                await getUsersDetails();
            }
        } catch (error) {
            console.log("Error while unpinning user", error);
            return { success: false };
        }
    };
    const makeSocketConnection = async () => {
        socket.on("connect", () => {
            socket.emit("register", userEmail);
        })
    };
    const getOldChats = async (selectPersonEmailID: string, groupID?: string) => {
        try {
            setChatsLoading(true);
            setChats([]);
            const apiObj = new APICallingServices();
            const response = await apiObj.getDataFromBackend("/teamChat/getOldMessage", { currentUser: userEmail, selectedPerson: selectPersonEmailID, groupID });
            if (response.success) {
                setChats(response.data);
            }
            setChatsLoading(false);
        } catch (error) {
            console.log("Error  ", error);
            setChats([]);
            setChatsLoading(false);
        }
    };
    const sendNewMessage = async (message: string, toEmailID: string, RecivedByName: string, groupID?: string, ReplyChatID?: Array<number>, file?: any) => {
        let FileURL: string | null = null;
        if (file) {
            const apiObj = new APICallingServices();
            const formData = new FormData();
            formData.append('image', file);
            formData.append("type", "Chat");
            const response = await apiObj.uploadDataWithFileToBackend("/image/upload", formData);
            if (response.success) {
                FileURL = response.data;
            }
        }
        if (!groupID) {
            socket.emit("sent-message", { message, toEmailID, fromEmailID: userEmail, RecivedByName, SendByName: userName, ReplyChatID: ReplyChatID?.join(','), FileURL });
            setChats((prevState) => {
                const newId = prevState.length === 0 ? 1 : prevState[prevState.length - 1].ID + 1;
                return [...prevState, {
                    ID: newId, Message: message, SendBy: userEmail, RecivedBy: toEmailID, createdAt: new Date(), RecivedByName: RecivedByName, SendByName: userName, ReplyChatID: ReplyChatID?.join(",")
                }]
            })
        } else {
            socket.emit("group-message", { message, fromEmailID: userEmail, SentByName: userName, groupID });
        }
    };
    const createGroup = async (groupName: string, userIDs: Array<string>, groupAbout: string, file: any): Promise<{ success: boolean, data: any }> => {
        let FileURL: string | null = null;
        if (file) {
            const apiObj = new APICallingServices();
            const formData = new FormData();
            formData.append('image', file);
            formData.append("type", "Chat");
            const response = await apiObj.uploadDataWithFileToBackend("/image/upload", formData);
            if (response.success) {
                FileURL = response.data;
            }
        }
        userIDs.push(userID);
        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/teamChat/createGroup", { userIDs, groupName, GroupCreateBy: userEmail, GroupAbout: groupAbout, GroupImageURL: FileURL });
        return response;
    };
    const deleteAllChat = async (selectedPersonEmailID: string): Promise<{ success: boolean, data: any }> => {
        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/teamChat/deleteChats", { type: "All", currentUser: userEmail, selectedPerson: selectedPersonEmailID });
        if (response.success) {
            setChats([]);
        }
        return response;
    }
    const deleteSingleChat = async (type: "DeleteByEveryone" | "DeleteByMe", ChatID: number, selectedPersonEmailID: string) => {
        const apiObj = new APICallingServices();
        const response = await apiObj.getDataFromBackend("/teamChat/deleteChats", { type, ChatID, selectedPerson: selectedPersonEmailID, currentUser: userEmail });
        if (response.success) {
            setChats((prevState: Array<IChatInterface>) => {
                prevState = prevState.filter(item => item.ID !== ChatID);
                return [...prevState]
            });
        }
        return response;
    }

    socket.on("message-recived", data => {
        // if (!currentUser) return;
        if (data.SendBy === currentUser?.userEmail) {
            setChats((prevState) => {
                return [...prevState, data]
            });
        } else {
            setChatPersonDetails((prevState) => {
                prevState.forEach((val) => {
                    if (val.userEmail === data.SendBy) {
                        val.NoOfNewMessage = val.NoOfNewMessage ? val.NoOfNewMessage + 1 : 1;
                    }
                })
                return [...prevState];
            })
            setPinnedChatPersonDetails((prevState) => {
                prevState.forEach((val) => {
                    if (val.userEmail === data.SendBy) {
                        val.NoOfNewMessage = val.NoOfNewMessage ? val.NoOfNewMessage + 1 : 1;
                    }
                })
                return [...prevState];
            })
        }
    })

    socket.on("group-recived-messages", data => {
        setChats((prevState) => {
            return [...prevState, data]
        });
    })

    socket.on("new-message-recived", data => {
        setChatPersonDetails((prevState) => {
            const arr: Array<IChatUserOrGroupInterface> = [];
            for (const item of data) {
                const key = item.SendBy;
                prevState = prevState.filter((val) => {
                    if (val.userEmail === key) {
                        val.NoOfNewMessage = item.NewMessageCount;
                        arr.push(val);
                        return false;
                    }
                    return true;
                })
            }
            return [...arr, ...prevState];
        })
        setAllChatPersonDetails((prevState) => {
            const arr: Array<IChatUserOrGroupInterface> = [];
            for (const item of data) {
                const key = item.SendBy;
                prevState = prevState.filter((val) => {
                    if (val.userEmail === key) {
                        val.NoOfNewMessage = item.NewMessageCount;
                        arr.push(val);
                        return false;
                    }
                    return true;
                })
            }
            return [...arr, ...prevState];
        })
        setPinnedChatPersonDetails((prevState) => {
            for (const item of data) {
                const key = item.SendBy;
                prevState.forEach((val) => {
                    if (val.userEmail === key || val.GroupID === key) {
                        val.NoOfNewMessage = item.NewMessageCount;
                    }
                })
            }
            return [...prevState];
        });
        setAllPinnedChatPersonDetails((prevState) => {
            for (const item of data) {
                const key = item.SendBy;
                prevState.forEach((val) => {
                    if (val.userEmail === key || val.GroupID === key) {
                        val.NoOfNewMessage = item.NewMessageCount;
                    }
                })
            }
            return [...prevState];
        })
    })

    useEffect(() => {
        getUsersDetails().then(() => {
        });
        makeSocketConnection();
    }, []);

    return { chatPersonDetails, pinnedChatPersonDetails, pinnedUser, unPinnedUser, getOldChats, chats, sendNewMessage, createGroup, chatsLoading, deleteAllChat, deleteSingleChat, chatTypeFilter, chatPersonOrGroupSearchHandler, clearHandlerOfQuery };
};

export default useTeamChatAction;