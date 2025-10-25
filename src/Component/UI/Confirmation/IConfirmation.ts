export default interface IConfirmation {
    openFormConfirmation: boolean;
    decisionHandler: (decision: boolean) => void;
}