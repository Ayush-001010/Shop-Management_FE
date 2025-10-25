import React from "react";
import type IItem from "./IItem";
import Footer from "../Footer/Footer";
import Image from "../../../../../../Image/scandinavian-vintage-wood-cabinet-with-chair-by-dark-blue-wall.jpg";
import { Button } from "antd";

const Item: React.FC<IItem> = ({ backHandler , submitHandler}) => {
    const [currentStyle, setCurrentStyle] = React.useState<"Style 1" | "Style 2" | "Style 3" | "Style 4" | null>(null);

    const chooseStyleHandler = (style: "Style 1" | "Style 2" | "Style 3" | "Style 4") => {
        setCurrentStyle(style);
    }
    const submitHandlerFunc = () => {
        submitHandler(currentStyle as "Style 1" | "Style 2" | "Style 3" | "Style 4");
    }
    return (
        <div>
            <div>
                <p className="text-lg text-[#212529] font-medium">Choose a Display Style for Product Items</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="w-120" onClick={() => chooseStyleHandler("Style 1")}>
                    <div>
                        <p className="text-lg text-[#212529] font-medium">Style 1</p>
                    </div>
                    <div className="bg-[#f8f9fa] p-2 rounded-lg shadow-sm">
                        <div className="rounded-lg overflow-hidden h-70 w-full">
                            <img className="object-cover h-full w-full" src={Image} alt="Image" />
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <p className="text-xl m-0 font-semibold text-[#495057]">Furniture</p>
                            <p className="font-light text-sm text-[#6c757d]">20000 Rs</p>
                            <Button style={{ border: "none", boxShadow: "none", padding: 0, margin: 0 }}>
                                <p className="m-0 bg-[#6c757d] w-20 h-10 rounded-lg shadow-sm flex justify-center items-center text-white hover:bg-[#495057]">
                                    <i className="bi bi-plus-lg text-lg" />
                                </p>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className=" flex flex-col justify-center items-center" onClick={() => chooseStyleHandler("Style 2")}>
                    <div>
                        <p className="text-lg text-[#212529] font-medium">Style 2</p>
                    </div>
                    <div>
                        <div className="rounded-full overflow-hidden h-60 w-60">
                            <img className="object-cover h-full w-full shadow-sm" src={Image} alt="Image" />
                        </div>
                        <div className="flex flex-col justify-center items-center gap-1 mt-2">
                            <p className="text-xl m-0 font-semibold text-[#495057]">Furniture</p>
                            <p className="font-light text-sm text-[#6c757d]">20000 Rs</p>
                            <Button style={{ border: "none", boxShadow: "none", padding: 0, margin: 0 }}>
                                <p className="m-0 border-1 border-[#6c757d] w-20 h-10 rounded-lg shadow-sm flex justify-center items-center text-black hover:bg-[#495057] hover:text-white">
                                    <i className="bi bi-plus-lg text-lg" />
                                </p>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-120" onClick={() => chooseStyleHandler("Style 3")}>
                    <div>
                        <p className="text-lg text-[#212529] font-medium">Style 3</p>
                    </div>
                    <div>
                        <div className="rounded-lg overflow-hidden h-70 w-full">
                            <img className="object-cover h-full w-full" src={Image} alt="Image" />
                        </div>
                        <div className="flex flex-col justify-start items-start">
                            <p className="text-xl m-0 font-semibold text-[#495057]">Furniture | Excellent Build and Finish</p>
                            <p className="font-light text-sm text-[#6c757d] m-1">20000 Rs</p>
                            <Button style={{ border: "none", boxShadow: "none", padding: 0, margin: 0 }}>
                                <p className="m-0 bg-[#6c757d] w-20 h-10 rounded-lg shadow-sm flex justify-center items-center text-white hover:bg-[#495057]">
                                    <i className="bi bi-plus-lg text-lg" />
                                </p>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-120" onClick={() => chooseStyleHandler("Style 4")}>
                    <div>
                        <p className="text-lg text-[#212529] font-medium">Style 4</p>
                    </div>
                    <div>
                        <div className="rounded-lg overflow-hidden h-70 w-full">
                            <img className="object-cover h-full w-full" src={Image} alt="Image" />
                        </div>
                        <div className="flex flex-col justify-center items-start gap-1 mt-2">
                            <div className="flex justify-between w-full">
                                <p className="text-xl m-0 font-semibold text-[#495057]">Furniture</p>
                                <p className="m-0 font-light text-sm text-[#6c757d]">20000 Rs</p>
                            </div>
                            <p className="font-light text-sm text-[#6c757d] m-1">Excellent Build and Finish</p>
                            <Button style={{ border: "none", boxShadow: "none", padding: 0, margin: 0 }}>
                                <p className="m-0 border-1 border-[#6c757d] w-20 h-10 rounded-lg shadow-sm flex justify-center items-center text-black hover:bg-[#495057] hover:text-white">
                                    <i className="bi bi-plus-lg text-lg" />
                                </p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-4">
                <p className="text-sm text-[#6c757d]">Selected Type: <span className="font-medium text-[#212529]">{!currentStyle ? "None" : currentStyle}</span></p>
            </div>
            <Footer backHandler={backHandler} submitHandler={submitHandlerFunc} finalSubmit={true} />
        </div>
    )
};

export default Item;