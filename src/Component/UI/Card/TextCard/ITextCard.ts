export default interface ITextCard {
    icon?: string;
    title: string;
    value: string | number;
    isOption?: boolean;
    optionValue?: Array<string>;
}