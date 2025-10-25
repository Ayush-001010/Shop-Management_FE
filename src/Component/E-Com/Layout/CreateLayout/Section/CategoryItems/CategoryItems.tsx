import React, { useEffect, useState } from "react";
import type ICategoryItems from "./ICategoryItems";
import useCreateLayoutAction from "../../../../../../Services/CustomHook/useCreateLayoutAction";
import useMessage from "antd/es/message/useMessage";
import Footer from "../Footer/Footer";

const CategoryItems: React.FC<ICategoryItems> = ({ backHandler, nextHandler }) => {
    const [value, setValue] = useState<string>("");
    const [options, setOptions] = useState<Array<string>>([]);
    const { getCategoryAndSubCategory } = useCreateLayoutAction();
    const [messageAPI, contextHandler] = useMessage();

    const selectOption = (opt: string) => setValue(opt);
    const submitHandler = () => {
        if (value.trim() === "") {
            messageAPI.error({ content: "Please select a Category Items to proceed." });
            return;
        }
        nextHandler(value)
    };
    useEffect(() => {
        getCategoryAndSubCategory("Category").then((response) => {
            setOptions(response.data);
        })
    }, []);
    return (
        <div>
            {contextHandler}
            <div>
                <p className="text-lg text-[#212529] font-medium">Select Category Items for Your Landing Page Display</p>
            </div>
            <div className="grid grid-cols-5 gap-2 my-4">
                {options.map((option) => <div className="bg-[#14213d] rounded-lg flex justify-center items-center h-10 shadow-sm cursor-pointer group hover:bg-[#003566]" onClick={() => selectOption(option)}>
                    <p className="m-0 text-[#e5e5e5] group-hover:font-medium">{option}</p>
                </div>)}
            </div>
            <div>
                <p className="text-sm text-[#6c757d]">Selected Category Items: <span className="font-medium text-[#212529]">{value === "" ? "None" : value}</span></p>
            </div>
            <Footer backHandler={backHandler} submitHandler={submitHandler} />
        </div>
    )
};

export default CategoryItems;