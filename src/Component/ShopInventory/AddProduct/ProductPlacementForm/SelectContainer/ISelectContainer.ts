export default interface ISelectContainer {
    containerDetails: Array<{ ContainerName: string, AvaliableSpace: number , ID : number }>;
    containerSelectHandler: (val: number) => void;
}