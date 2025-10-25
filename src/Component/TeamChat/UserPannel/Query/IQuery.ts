export default interface IQuery {
    isSearchQuery: boolean;
    chatVisiableType: "All" | "Groups" | "Personal";
    chatVisiableHandler: (type: "All" | "Groups" | "Personal") => void;
}