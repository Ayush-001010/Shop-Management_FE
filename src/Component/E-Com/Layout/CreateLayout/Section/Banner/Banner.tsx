import React, { useEffect, useState } from "react";
import type IBanner from "./IBanner";
import { Select, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import CreateLayoutConfig from "../../../../../../Services/Config/CreateLayoutConfig";
import useMessage from "antd/es/message/useMessage";
import Footer from "../Footer/Footer";
import useCreateLayoutAction from "../../../../../../Services/CustomHook/useCreateLayoutAction";
import type { IOptionsInterface } from "../../../../../../Services/Interface/CommonInterface";
import type { IBannerTypeInterface } from "../../../../../../Services/Interface/CreateLayoutInterface";

const Banner: React.FC<IBanner> = ({ backHandler, nextHandler }) => {
    const [noOfImages, setNoOfImages] = useState<number>(1);
    const [imageURLs, setImageURLs] = useState<Array<string>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [messageAPI, contextHandler] = useMessage();
    const [redirectLinkType, setRedirectLinkType] = useState<Array<IBannerTypeInterface>>([{ RedirectType: "None" }]);
    const { getCategoryAndSubCategory } = useCreateLayoutAction();
    const [categoryOptions, setCategoryOptions] = useState<Array<IOptionsInterface>>([]);
    const [subCategoryOptions, setSubCategoryOptions] = useState<Array<IOptionsInterface>>([]);

    const increasesNumberOfImages = () => {
        if (noOfImages === 5) {
            messageAPI.info({ content: "Maximum 5 images can be uploaded" });
            return;
        }
        setNoOfImages((prevState) => prevState + 1);
        setImageURLs((prevState) => [...prevState, ""]);
        setRedirectLinkType((prevState) => [...prevState, {
            RedirectType: "None"
        }]);
    };
    const changeHandlerForRedirectType = (index: number, newValue: "None" | "Category" | "Sub-Category" | "Discount") => {
        setRedirectLinkType((prevState) => {
            prevState[index] = {  ...prevState[index] , RedirectType: newValue };
            return [...prevState];
        });
    };
    const uploadHandler = (info: any, index: number) => {
        const { file } = info;
        if (file.status !== "done") {
            const rawFile = file.originFileObj;
            if (!rawFile) return;

            setLoading(true);
            const imageURL = URL.createObjectURL(rawFile);

            setImageURLs((prevState) => {
                prevState[index] = imageURL;
                return [...prevState];
            });
            setLoading(false);
        }
        setRedirectLinkType((prevState) => {
            prevState[index] = { ...prevState[index], File: file.originFileObj };
            return [...prevState];
        });
    };
    const beforeUploadImageHandler = (file: any) => {
        const type = file.type;
        if (!CreateLayoutConfig.acceptImageTypesAllowed.includes(type)) {
            messageAPI.error({ content: "Image type is not allowed!!!" });
        }
    };
    const submitHandler = () => {
        if (noOfImages === 0) {
            messageAPI.error({ content: "Please upload at least one image." });
            return;
        }
        if (imageURLs.length !== noOfImages) {
            messageAPI.error({ content: "Please upload all images or remove empty upload slots." });
            return;
        }
        imageURLs.forEach(url => {
            if (url.trim() === "") {
                messageAPI.error({ content: "Please upload all images or remove empty upload slots." });
                return;
            }
        })
        let isError = false;
        redirectLinkType.map((item: IBannerTypeInterface) => {
            if (isError) return;
            if (item.RedirectType === "Category" && !item.CategoryType) {
                messageAPI.error({ content: "Please select Category Type for all banners." });
                isError = true;
            } else if(item.RedirectType === "Sub-Category" && (!item.CategoryType || !item.SubCategoryType)) {
                messageAPI.error({ content: "Please select Category Type and Sub Category Type for all banners." });
                isError = true;
            } else if(item.RedirectType === "Discount" && (!item.DiscountType || !item.CategoryType)) {
                messageAPI.error({ content: "Please select Discount Type for all banners." });
                isError = true;
            }
        })
        if (isError) return;
        nextHandler(redirectLinkType);
    };
    const deleteImageHandler = (index: number) => {
        setImageURLs((prevState) => {
            if (prevState.length <= index) return prevState;
            const arr1 = prevState.slice(0, index);
            const arr2 = prevState.slice(index + 1, prevState.length);
            return [...arr1, ...arr2];
        });
        setNoOfImages((prevState) => prevState - 1);
        setRedirectLinkType((prevState) => {
            if (prevState.length <= index) return prevState;
            const arr1 = prevState.slice(0, index);
            const arr2 = prevState.slice(index + 1, prevState.length);
            return [...arr1, ...arr2];
        });
    };
    const changeHandlerForCategoryType = async (index: number, newValue: string) => {
        setRedirectLinkType((prevState) => {
            prevState[index] = { ...prevState[index], CategoryType: newValue };
            return [...prevState];
        });
        const res = await getCategoryAndSubCategory("SubCategory", newValue);
        if (res.success) {
            const options: Array<IOptionsInterface> = res.data.map((subCategory: string) => {
                return { label: subCategory, value: subCategory };
            });
            setSubCategoryOptions(options);
        }
    };
    const changeHandlerForSubCategoryType = (index: number, newValue: string) => {
        setRedirectLinkType((prevState) => {
            prevState[index] = { ...prevState[index], SubCategoryType: newValue };
            return [...prevState];
        });
    };
    const changeHandlerForDiscountType = (index: number, newValue: string) => {
        setRedirectLinkType((prevState) => {
            prevState[index] = { ...prevState[index], DiscountType: newValue };
            return [...prevState];
        });
    };
    useEffect(() => {
        getCategoryAndSubCategory("Category").then((response) => {
            if (response.success) {
                const opt: Array<IOptionsInterface> = response.data.map((category: string) => {
                    return { label: category, value: category };
                });
                setCategoryOptions(opt);
            }
        });
    }, []);

    return (
        <div>
            {contextHandler}
            <div>
                <p className="text-lg text-[#212529] font-medium">Upload Banner Images</p>
            </div>
            <div className="flex gap-2">
                {Array(noOfImages).fill(0).map((_, index) => (
                    <div className="w-34 mx-2" key={index * Math.random()}>
                        <Upload name="avatar" listType="picture-card" className="avatar-uploader" showUploadList={false} beforeUpload={beforeUploadImageHandler} onChange={(info) => uploadHandler(info, index)} style={{ width: "100%" }}>
                            {(imageURLs.length > index && imageURLs[index]) ? (<div className="w-30 h-24 rounded-lg overflow-hidden">
                                <img className="w-full h-full object-cover" draggable={false} src={imageURLs[index]} alt="avatar" style={{ width: '100%' }} />
                            </div>
                            ) : (
                                <button style={{ border: 0, background: 'none' }} type="button">
                                    {loading ? <LoadingOutlined className="font-medium" /> : <PlusOutlined className="font-medium" />}
                                    <div style={{ marginTop: 8 }} className="font-medium">Upload</div>
                                </button>
                            )}
                        </Upload>
                        <div>
                            {(imageURLs.length > index && imageURLs[index]) && (
                                <div className="mt-1">
                                    <div className="mt-1">
                                        <label className="font-medium text-xs text-[#001d3d]">Redirect Link : </label>
                                        <Select className="w-full mt-1" options={CreateLayoutConfig.redirectOptions} value={redirectLinkType[index].RedirectType} onChange={(newValue) => changeHandlerForRedirectType(index, newValue)} />
                                    </div>
                                    {(redirectLinkType[index].RedirectType === "Category" || redirectLinkType[index].RedirectType === "Sub-Category" || redirectLinkType[index].RedirectType === "Discount") && (
                                        <div className="mt-1">
                                            <label className="font-medium text-xs text-[#001d3d]">Category-Type : </label>
                                            <Select className="w-full mt-1" value={redirectLinkType[index].CategoryType} options={categoryOptions} onChange={(newValue) => changeHandlerForCategoryType(index, newValue)} />
                                        </div>
                                    )}
                                    {redirectLinkType[index].RedirectType === "Sub-Category" && (
                                        <div className="mt-1">
                                            <label className="font-medium text-sm text-[#001d3d]">Sub Category-Type: </label>
                                            <Select className="w-full mt-1" value={redirectLinkType[index].SubCategoryType} options={subCategoryOptions} onChange={(newValue) => changeHandlerForSubCategoryType(index, newValue)} />
                                        </div>
                                    )}
                                    {redirectLinkType[index].RedirectType === "Discount" && (
                                        <div className="mt-1">
                                            <label className="font-medium text-sm text-[#001d3d]">Discount: </label>
                                            <Select className="w-full mt-1" value={redirectLinkType[index].DiscountType} options={CreateLayoutConfig.discountOptions} onChange={(newValue) => changeHandlerForDiscountType(index, newValue)} />
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className="flex justify-center items-center mt-1 cursor-pointer" onClick={() => deleteImageHandler(index)}>
                                <p className="flex justify-center items-center hover:bg-[#9d0208] bg-[#d00000] rounded-lg p-2 w-6 h-6">
                                    <i className="bi bi-trash3 text-white" />
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                <div onClick={increasesNumberOfImages}>
                    <p className=" border-1 border-dashed border-[#d9d9d9] bg-[#00000005] hover:border-[#1677ff]  w-24 h-24 rounded-full flex flex-col justify-center items-center cursor-pointer">
                        <i className="bi bi-plus-circle text-lg font-medium" />
                    </p>
                </div>
            </div>
            <Footer backHandler={backHandler} submitHandler={submitHandler} />
        </div>
    )
};

export default Banner;