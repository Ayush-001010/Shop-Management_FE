import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import type { NotificationInstance } from "antd/es/notification/interface";
// import type INotificationMessageInterface from "../Interface/NotificationInterface";
// import { setNewMessages } from "../../Redux/Notifications";

const useNotificationAction = (api: NotificationInstance) => {
    const socket = io("http://localhost:3000");
    const { userID, userEmail } = useSelector((state: any) => state.user);
    // const dispatch = useDispatch();

    const makeSocketConnection = () => {
        socket.on("connect", () => {
            socket.emit("register_notification_service", { emailID: userEmail });
        });
    }

    socket.on("new-notification-recived", data => {
        console.log("Hey Recived New Message    ", data);
        api.info({
            message : `Notification received from ${data.By}`,
            placement:"bottomRight"
        })
        // const arr: Array<INotificationMessageInterface> = data.map((item: any) => {
        //     return {
        //         ID: item.ID,
        //         Message: item.Message,
        //         By: item.By,
        //         timestamp: new Date(item.createdAt)
        //     }
        // });
        // dispatch(setNewMessages({
        //     messages: arr
        // }))
    })

    useEffect(() => {
        makeSocketConnection();
    }, [userID])
};

export default useNotificationAction;