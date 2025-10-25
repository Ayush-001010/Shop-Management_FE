export interface IBannerTypeInterface {
    RedirectType: "None" | "Category" | "Sub-Category" | "Discount";
    CategoryType?: string;
    SubCategoryType?: string;
    DiscountType?: string;
    File?: File;
}

export interface ISectionInfoInterface {
    title: "Banner" | "Category" | "Sub-Category" | "Category-Items" | "Items";
    description: string;
}

export default interface ILayoutInterface {
    sectionType: "Banner" | "Category" | "Sub-Category" | "Category-Items" | "Items" | "ItemUI";
    categoryUIType?: "Circular" | "Rectangular";
    subCategoryType?: { Category: string, SubCategory: string };
    itemsCategoryType?: string;
    bannerInfo?: Array<IBannerTypeInterface>;
    itemUIStyle?: "Style 1" | "Style 2" | "Style 3" | "Style 4";
}