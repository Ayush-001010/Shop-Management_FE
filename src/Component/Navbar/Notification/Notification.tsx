import React from "react";
import type INotification from "./INotification";
import { useSelector } from "react-redux";
import moment from "moment";
import type { INotificationReduxState } from "../../../Redux/Notifications";

const Notification: React.FC<INotification> = () => {
    const { messages }: INotificationReduxState = useSelector((state: any) => state.notification);

    return (
        <div className="w-[400px]">
            <div>
                <p className="text-sm text-[#212529] font-semibold">Notification</p>
            </div>
            {messages.map(messageItem => (
                <div className="flex flex-col shadow-sm bg-[#f8f9fa] p-1 rounded-lg">
                    <div>
                        <p className="text-xs text-[#212529] m-0">{messageItem.Message}</p>
                    </div>
                    <div className="flex justify-end">
                        <p className="text-xs text-[#adb5bd] m-0">{messageItem.By} {moment(messageItem.timestamp).format("DD/MM/YYYY HH:mm")}</p>
                    </div>
                    <div className="flex justify-end">
                        <p className="underline text-xs text-[#212529] m-0 cursor-pointer hover:font-medium">clear</p>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Notification;