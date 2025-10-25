import type { IChatUserOrGroupInterface } from "../../../../../Services/Interface/TeamChatInterface";

export default interface IPersonCard {
    personDetails: IChatUserOrGroupInterface;
    isPinned?: boolean;
}