export interface IChatMessageOptionInterface {
    text: string;
    type: "link" | "function",
    callbackFunc?: any
}

export interface IChatMessageInterface {
    text: string;
    options?: Array<IChatMessageOptionInterface>;
    by: "Server" | "User";
    isResponse?: boolean;
}