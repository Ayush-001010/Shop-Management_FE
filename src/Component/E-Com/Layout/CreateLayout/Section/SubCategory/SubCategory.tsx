import React, { useEffect, useState } from "react";
import type ISubCategory from "./ISubCategory";
import useCreateLayoutAction from "../../../../../../Services/CustomHook/useCreateLayoutAction";
import Footer from "../Footer/Footer";
import useMessage from "antd/es/message/useMessage";

const SubCategory: React.FC<ISubCategory> = ({ backHandler, nextHandler }) => {
    const { getCategoryAndSubCategory } = useCreateLayoutAction();
    const [options, setOptions] = useState<Array<string>>([]);
    const [value, setValue] = useState<{ Category: string, SubCategory: string }>({ Category: "", SubCategory: "" });
    const [type, setType] = useState<"Category" | "SubCategory">("Category");
    const [messageAPI, contextHandler] = useMessage();

    const selectOption = async (option: string) => {
        if (type === "Category") {
            setValue((prevState) => {
                prevState.Category = option;
                return { ...prevState };
            })
            setType("SubCategory");
            const response = await getCategoryAndSubCategory("SubCategory", option);
            if (response.success) {
                setOptions(response.data);
            }
        } else {
            setValue((prevState) => {
                prevState.SubCategory = option;
                return { ...prevState };
            })
        }
    }
    const submitHandler = () => {
        if (type === "Category" || value.SubCategory.trim() === "") {
            messageAPI.error({ content: "Please select a Sub-Category and Category to proceed." });
            return;
        }
        nextHandler(value);
    }
    useEffect(() => {
        getCategoryAndSubCategory("Category").then((response) => {
            if (response.success) {
                setOptions(response.data);
            }
        });
    }, []);
    return (
        <div>
            {contextHandler}
            <div>
                <p className="text-lg text-[#212529] font-medium">Select the Sub-Category Items to Display on Your Landing Page </p>
            </div>
            <div className="grid grid-cols-5 gap-2 my-4">
                {options.map((option) => <div className="bg-[#14213d] rounded-lg flex justify-center items-center h-10 shadow-sm cursor-pointer group hover:bg-[#003566]" onClick={() => selectOption(option)}>
                    <p className="m-0 text-[#e5e5e5] group-hover:font-medium">{option}</p>
                </div>)}
            </div>
            <div>
                <p className="text-sm text-[#6c757d]">Selected Category: <span className="font-medium text-[#212529]">{value.Category === "" ? "None" : value.Category}</span></p>
                <p className="text-sm text-[#6c757d]">Selected Sub-Category: <span className="font-medium text-[#212529]">{value.SubCategory === "" ? "None" : value.SubCategory}</span></p>
            </div>
            <Footer backHandler={backHandler} submitHandler={submitHandler} />
        </div>
    )
};

export default SubCategory;