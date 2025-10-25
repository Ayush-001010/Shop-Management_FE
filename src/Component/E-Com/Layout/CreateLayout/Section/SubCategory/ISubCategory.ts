export default interface ISubCategory {
    backHandler: () => void;
    nextHandler: (val: { Category: string, SubCategory: string }) => void;
}