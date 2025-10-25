export default interface IItem {
    backHandler: () => void;
    submitHandler: (currentStyle: "Style 1" | "Style 2" | "Style 3" | "Style 4") => void;
}