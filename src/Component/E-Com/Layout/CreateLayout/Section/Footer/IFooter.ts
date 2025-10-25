export default interface IFooter {
    backHandler: () => void;
    submitHandler: () => void;
    finalSubmit?: boolean;
}