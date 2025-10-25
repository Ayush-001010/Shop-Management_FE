export interface IChatInterface {
    ID: number;
    Message: string;
    SendBy: string;
    RecivedBy: string;
    createdAt: Date;
    RecivedByName: string;
    SendByName: string;
    ReplyChatID?: string;
    FileURL?: string;
}

export interface IChatUserOrGroupInterface {
    userName?: string;
    userEmail?: string;
    userImageURL?: string;
    About?: string;
    GroupName?: string;
    GroupID?: string;
    ID: number;
    GroupCreateBy?: string;
    GroupImageURL?: string;
    GroupAbout?: string;
    NoOfNewMessage?: number;
}