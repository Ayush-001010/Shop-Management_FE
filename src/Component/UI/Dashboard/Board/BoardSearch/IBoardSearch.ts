export default interface IBoardSearch {
    header: string;
    isOpenFunc : (type : "filter" | "search" | null) => void;
}