export default interface IContainerButton {
    containerData: { ContainerName: string, AvaliableSpace: number , ID : number };
    containerSelectHandler: (val: number) => void;
}