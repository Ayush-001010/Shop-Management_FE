import React from "react";
import type IFooter from "./IFooter";
import { Button } from "antd";

const Footer: React.FC<IFooter> = ({ backHandler, submitHandler, finalSubmit }) => {
    return (
        <div className="mt-2 flex justify-end gap-2">
            <Button onClick={backHandler} className="m-0 p-0 shadow-none border-0">
                <p className="m-0 bg-[#d00000] text-white hover:bg-[#9d0208] hover:text-white w-40 h-10 rounded-xl shadow-sm flex justify-center items-center">Back</p>
            </Button>
            <Button onClick={submitHandler} className="m-0 p-0 shadow-none border-0">
                <p className="m-0 bg-[#52b788] text-white hover:bg-[#40916c] hover:text-white w-40 h-10 rounded-xl shadow-sm flex justify-center items-center">{finalSubmit ? "Submit" : "Next"}</p>
            </Button>
        </div>
    )
};

export default Footer;
