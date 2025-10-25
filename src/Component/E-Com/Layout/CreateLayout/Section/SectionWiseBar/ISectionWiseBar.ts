import type ILayoutInterface from "../../../../../../Services/Interface/CreateLayoutInterface";

export default interface ISectionWiseBar {
    data: Array<ILayoutInterface>;
    deleteSectionHandler: (index: number) => void;
}