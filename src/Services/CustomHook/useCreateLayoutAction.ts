import APICallingServices from "../APICallingService";
import type ILayoutInterface from "../Interface/CreateLayoutInterface";

const useCreateLayoutAction = () => {

    const getCategoryAndSubCategory = async (type: "Category" | "SubCategory", Category?: string) => {
        try {
            const apiObj = new APICallingServices();
            const response = await apiObj.getDataFromBackend(`/ecom/getCategoryAndSubCategory?type=${type}&Category=${Category}`);
            return response;
        } catch (error) {
            console.log("Error  ", error);
            return { success: false, data: [] };
        }
    }
    const addLayoutSections = async (data: Array<ILayoutInterface>) => {
        try {
            console.log("Data to be sent", data);
    
            const apiObj = new APICallingServices();
            const addObj: Array<any> = [];
            let itemSchema: any = {};
            let serialNumber = 1;
    
            const uploadBannerImages = async (bannerInfo: any[]) => {
                const imageURLs: string[] = [];
                const redirectLinks: string[] = [];
                const categories: string[] = [];
                const subCategories: string[] = [];
                const discounts: string[] = [];
    
                for (const banner of bannerInfo) {
                    const file = banner.File;
                    if (file) {
                        let { name: fileName = "", type: fileType = "" } = file;
                        fileName = "User_Profile_Images/" + fileName
                        const response = await apiObj.getDataFromBackend("/aws/getURLForUploadFileInS3", {
                            fileName,
                            contentType: fileType
                        });
    
                        if (response.success && response.data) {
                            try {
                                await apiObj.uploadFileToS3(response.data, file, fileType);
                                imageURLs.push(`image/${fileName}`); // Only push after successful upload
                                console.log("Uploaded file to S3:", fileName);
                            } catch (uploadError) {
                                console.error("S3 upload failed for", fileName, uploadError);
                            }
                        } else {
                            console.warn("Failed to get S3 URL for", fileName, response);
                        }
                    } else {
                        console.warn("No file found in banner:", banner);
                    }
    
                    redirectLinks.push(banner.RedirectType || "");
                    categories.push(banner.CategoryType || "");
                    subCategories.push(banner.SubCategoryType || "");
                    discounts.push(banner.DiscountType || "");
                }
    
                return {
                    ImageURLs: imageURLs.join("||"),
                    RedirectLink: redirectLinks.join("||"),
                    Category: categories.join("||"),
                    SubCategory: subCategories.join("||"),
                    Discount: discounts.join("||")
                };
            };
    
            for (const section of data) {
                switch (section.sectionType) {
                    case "ItemUI":
                        itemSchema = { ItemUIType: section.itemUIStyle };
                        break;
    
                    case "Banner":
                        if (section.bannerInfo?.length) {
                            const bannerData = await uploadBannerImages(section.bannerInfo);
                            addObj.push({
                                SectionType: "Banner",
                                ...bannerData,
                                CategoryItems: null,
                                CategoryUIType: null,
                                SerialNumber: serialNumber++
                            });
                        }
                        break;
    
                    case "Category":
                        addObj.push({
                            SectionType: "Category",
                            ImageURLs: null,
                            RedirectLink: null,
                            CategoryItems: null,
                            Category: null,
                            SubCategory: null,
                            Discount: null,
                            CategoryUIType: section.categoryUIType,
                            SerialNumber: serialNumber++
                        });
                        break;
    
                    case "Sub-Category":
                        addObj.push({
                            SectionType: "Sub-Category",
                            ImageURLs: null,
                            RedirectLink: null,
                            CategoryItems: null,
                            Category: section.subCategoryType?.Category || null,
                            SubCategory: section.subCategoryType?.SubCategory || null,
                            Discount: null,
                            CategoryUIType: null,
                            SerialNumber: serialNumber++
                        });
                        break;
    
                    case "Category-Items":
                        addObj.push({
                            SectionType: "Category-Items",
                            ImageURLs: null,
                            RedirectLink: null,
                            CategoryItems: section.itemsCategoryType,
                            Category: null,
                            SubCategory: null,
                            Discount: null,
                            CategoryUIType: null,
                            SerialNumber: serialNumber++
                        });
                        break;
    
                    case "Items":
                        addObj.push({
                            SectionType: "Items",
                            ImageURLs: null,
                            RedirectLink: null,
                            CategoryItems: null,
                            Category: null,
                            SubCategory: null,
                            Discount: null,
                            CategoryUIType: null,
                            SerialNumber: serialNumber++
                        });
                        break;
    
                    default:
                        console.warn("Unknown section type:", section.sectionType);
                        break;
                }
            }
    
            const response = await apiObj.getDataFromBackend("/layout/createLayout", {
                sectionSchema: addObj,
                itemSchema
            });
    
            console.log("Response after adding layout sections", response);
            return response;
        } catch (error) {
            console.error("Error in addLayoutSections:", error);
            return { success: false };
        }
    };
    


    return { getCategoryAndSubCategory, addLayoutSections };
};

export default useCreateLayoutAction;