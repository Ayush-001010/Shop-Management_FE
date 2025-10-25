import type { IBannerTypeInterface } from "../../../../../../Services/Interface/CreateLayoutInterface";

export default interface IBanner {
    backHandler: () => void;
    nextHandler: (redirectLinkType: Array<IBannerTypeInterface>) => void;
}