export default interface IAddProductForm {
    changeTheStepHandler: (value: Record<string, any>) => void;
    currentStep: number;
}