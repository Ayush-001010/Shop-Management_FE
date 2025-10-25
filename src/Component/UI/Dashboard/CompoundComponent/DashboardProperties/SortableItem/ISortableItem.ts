export default interface ISortableItem {
  item: {
    backendName: string;
    displayName: string;
    value: boolean;
    id: number;
  };
  changeHandler: (backendName: string, newValue: boolean) => void;
}