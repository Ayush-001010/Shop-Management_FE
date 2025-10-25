export default interface IBoardFilter {
    header: string;
    isOpenFunc : (type : "filter" | "search" | null) => void;
}