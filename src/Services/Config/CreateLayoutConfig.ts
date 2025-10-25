import type { IOptionsInterface } from "../Interface/CommonInterface";
import type { ISectionInfoInterface } from "../Interface/CreateLayoutInterface";

export default class CreateLayoutConfig {
    static readonly sectionOption: Array<ISectionInfoInterface> = [
        {
            title: "Banner",
            description: "The top section of your landing page, typically used for promotions, hero images, or announcements."
        },
        {
            title: "Category",
            description: "Displays main product categories to help users navigate your store easily."
        },
        {
            title: "Sub-Category",
            description: "Shows sub-categories under each main category for more refined browsing."
        },
        {
            title: "Category-Items",
            description: "Lists products grouped under a specific category or sub-category."
        },
        {
            title: "Items",
            description: "Displays individual products available for purchase, including details like price and images."
        }
    ];
    static readonly acceptImageTypesAllowed: Array<string> = ["image/png", "image/jpeg", "image/jpg"];
    static readonly redirectOptions: Array<IOptionsInterface> = [
        { label: "None", value: "None" },
        { label: "Category", value: "Category" },
        { label: "Sub-Category", value: "Sub-Category" },
        { label: "Discount", value: "Discount" },
    ];
    static readonly discountOptions: Array<IOptionsInterface> = [
        { label: "10% Off", value: "10% Off" },
        { label: "25% Off", value: "20% Off" },
        { label: "50% Off", value: "50% Off" },
        { label: "60% Off", value: "60% Off" },
        { label: "75% Off", value: "75% Off" },
    ];
}