export default interface ICustomConfirmationModal {
    openModal: boolean;
    closeHandler: () => void;
    confirmationText: string;
    cancelButtonText: string;
    confirmButtonText: string;
    confirmationHandler: () => void;
}