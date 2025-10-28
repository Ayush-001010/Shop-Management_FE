import React, { useState } from "react";
import type IImagesUI from "./IImagesUI";
import { message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import CreateLayoutConfig from "../../../../../../Services/Config/CreateLayoutConfig";

const ImagesUI: React.FC<IImagesUI> = ({ formik, backendName }) => {
    const [noOfImages, setNoOfImages] = useState<number>(1);
    const [imageURLs, setImageURLs] = useState<Array<string>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [messageAPI, contextHandler] = message.useMessage();
    const [file, setFile] = useState<Array<File>>([]);

    const increasesNumberOfImages = () => {
        if (noOfImages === 5) {
            messageAPI.info({ content: "Maximum 5 images can be uploaded" });
            return;
        }
        setNoOfImages((prevState) => prevState + 1);
        setImageURLs((prevState) => [...prevState, ""]);
    };
    const beforeUploadImageHandler = (file: any) => {
        const type = file.type;
        if (!CreateLayoutConfig.acceptImageTypesAllowed.includes(type)) {
            // messageAPI.error({ content: "Image type is not allowed!!!" });
        }
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
            setFile((prevState) => {
                prevState.push(file);
                formik.setFieldValue(backendName, prevState);
                return [...prevState];
            })
        }
    };
    console.log(file);

    return (
        <div>
            {contextHandler}
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
                    </div>
                ))}
                <div onClick={increasesNumberOfImages}>
                    <p className=" border-1 border-dashed border-[#d9d9d9] bg-[#00000005] hover:border-[#1677ff]  w-24 h-24 rounded-full flex flex-col justify-center items-center cursor-pointer">
                        <i className="bi bi-plus-circle text-lg font-medium" />
                    </p>
                </div>
            </div>
        </div>
    )
};

export default ImagesUI;