export default interface ISectionCard {
    title: "Banner" | "Category" | "Sub-Category" | "Category-Items" | "Items";
    description: string;
    clickHandler:(title: "Banner" | "Category" | "Sub-Category" | "Category-Items" | "Items")=>void;
}