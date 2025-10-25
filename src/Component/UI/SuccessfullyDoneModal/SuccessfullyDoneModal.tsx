import React from "react";
import type ISuccessfullyDoneModal from "./ISuccessfullyDoneModal";
import { Button, Modal } from "antd";
import { Link } from "react-router-dom";
import styles from "./SuccessfullyDoneModal.module.css";

const SuccessfullyDoneModal: React.FC<ISuccessfullyDoneModal> = ({ open, title, description, link }) => {
    return (
        <Modal open={open} footer={null} closable={false} width={"800px"} centered={true}>
            <div className="p-1">
                <div className="flex justify-center items-center">
                    <p className={`text-2xl font-semibold text-[#212529] font-medium text-shadow-sm`}>{title}</p>
                </div>
                <div className="flex justify-center items-center">
                    <p className={`text-normal text-md text-[#212529]`}>{description}</p>
                </div>
                <div className="flex  justify-center items-center">
                    <p className="border text-md font-semibold cursor-pointer hover:bg-[#212529] hover:text-white  p-2 rounded-lg w-40 text-center" onClick={()=>window.location.reload()}>Close</p>
                </div>
                {link && <div className="flex justify-center items-center w-full">
                    <div className="w-1/2">
                        <Link to={link}>
                            <Button className={`font-semibold ${styles.NextStepButtonCSS} w-full`}>
                                Next Step
                            </Button>
                        </Link>
                    </div>
                </div>}
            </div>
        </Modal>
    )
};

export default SuccessfullyDoneModal;