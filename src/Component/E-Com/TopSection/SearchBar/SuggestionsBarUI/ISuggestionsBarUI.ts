export default interface ISuggestionsBarUI {
    isLoading: boolean;
    suggestions: Array<string>;
    searchStr: string;
    recentValues: Array<string>;
    recentSelectHandler: (value: string) => void;
}