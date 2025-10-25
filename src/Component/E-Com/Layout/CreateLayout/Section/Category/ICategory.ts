export default interface ICategory {
    backHandler: () => void;
    nextHandler: (type: "Circular" | "Rectangular") => void;
}