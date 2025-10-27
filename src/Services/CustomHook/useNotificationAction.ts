import { io } from "socket.io-client";
import CommonConfig from "../Config/CommonConfig";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type INotificationMessageInterface from "../Interface/NotificationInterface";
import { setNewMessages } from "../../Redux/notifications";

const useNotificationAction = () => {
    const socket = io(CommonConfig.socketBaseURL);
    const { userID, userEmail } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    const makeSocketConnection = () => {
        socket.on("connect", () => {
            socket.emit("notification-register", { emailID: userEmail, userID });
        });
    }

    socket.on("new-notification-recived", data => {
        console.log("Data   ", data);
        const arr: Array<INotificationMessageInterface> = data.map((item: any) => {
            return {
                ID: item.ID,
                Message: item.Message,
                By: item.By,
                timestamp: new Date(item.createdAt)
            }
        });
        dispatch(setNewMessages({
            messages: arr
        }))
    })

    useEffect(() => {
        makeSocketConnection();
    }, [userID])
};

export default useNotificationAction;