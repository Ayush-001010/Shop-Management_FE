import React, { useState } from "react";
import type ICategory from "./ICategory";
import CategoryImage from "../../../../../../Image/home-made-robot-desk.jpg";
import Footer from "../Footer/Footer";
import useMessage from "antd/es/message/useMessage";

const Category: React.FC<ICategory> = ({ backHandler, nextHandler }) => {
    const [type, setType] = useState<"Circular" | "Rectangular" | "">("");
    const [messageAPI, contextHandler] = useMessage();

    const selectTypeHandler = (type: "Circular" | "Rectangular") => {
        setType(type)
    }
    const submitHandler = () => {
        if (type === "") {
            messageAPI.error({ content: "Please select a category display type." });
            return;
        }
        nextHandler(type as "Circular" | "Rectangular");
    }
    return (
        <div>
            {contextHandler}
            <div>
                <p className="text-lg text-[#212529] font-medium">Choose How Categories Are Displayed</p>
            </div>
            <div className="flex gap-4 justify-between">
                <div className="cursor-pointer" onClick={() => selectTypeHandler("Rectangular")}>
                    <div className="flex justify-center">
                        <p className="text-base font-medium text-[#343a40]">Rectangular</p>
                    </div>
                    <div className="flex w-130 h-70 shadow-lg rounded-lg bg-[#f8f9fa]" >
                        <div className="flex w-40 flex-col items-center justify-center">
                            <p className="m-0 text-lg font-medium text-[#343a40]">Eletronics</p>
                            <p className="m-0 text-xs font-light text-[#adb5bd]">Ex-Phones , Lamps etc</p>
                        </div>
                        <div className="w-90 h-70 rounded-lg overflow-hidden">
                            <img className="w-full h-full object-cover" src={CategoryImage} alt="category" />
                        </div>
                    </div>
                </div>
                <div className="cursor-pointer" onClick={() => selectTypeHandler("Circular")}>
                    <div className="flex justify-center">
                        <p className="text-base font-medium text-[#343a40]">Circular</p>
                    </div>
                    <div className="w-90 h-70 flex flex-col items-center justify-center" >
                        <div className="w-60 h-60 shadow-lg rounded-full overflow-hidden">
                            <img className="w-full h-full object-cover" src={CategoryImage} alt="category" />
                        </div>
                        <div className="w-full flex flex-col justify-center mt-2 items-center">
                            <p className="flex justify-center w-full m-0 mr-2 text-lg font-medium text-[#343a40]">Eletronics</p>
                            <p className="m-0 text-xs font-light text-[#adb5bd]">Ex-Phones , Lamps etc</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-4">
                <p className="text-sm text-[#6c757d]">Selected Type: <span className="font-medium text-[#212529]">{type === "" ? "None" : type}</span></p>
            </div>
            <Footer backHandler={backHandler} submitHandler={submitHandler} />
        </div>
    )
};

export default Category;