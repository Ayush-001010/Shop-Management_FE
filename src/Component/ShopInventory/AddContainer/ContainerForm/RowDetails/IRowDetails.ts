export default interface IRowDetails {
    applyHeightHandler : (value : any) => void;
    applyColumnHandler : (value : any) => void;
    setColumnWidthInPerticularRow : (colIndex: number, newColumnWidth: number) => void;
}