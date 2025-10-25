import type { IChatInterface } from "../../../../../Services/Interface/TeamChatInterface";

export default interface IChat {
    details: IChatInterface;
    sendBy: string;
    lastSendBy: string;
    replyMessage? : Array<IChatInterface>;
}