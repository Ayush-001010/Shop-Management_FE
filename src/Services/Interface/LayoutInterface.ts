export interface IItemLayoutItemface {
    UIType: "Style 1" | "Style 2" | "Style 3" | "Style 4";
}

export default interface ISectionLayoutInterface {
    SectionType: "Banner" | "Category" | "Sub-Category" | "Category-Items" | "Items",
    ImageURLs?: Array<string>;
    RedirectLink?: Array<"None" | "Category" | "Sub-Category" | "Discount">;
    CategoryItems?: string;
    Category?: Array<string>;
    SubCategory?: string;
    Discount?: "10% Off" | "20% Off" | "50% Off" | "60% Off" | "75% Off";
    CategoryUIType?: "Circular" | "Rectangular";
}