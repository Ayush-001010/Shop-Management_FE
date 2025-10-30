import React from "react";
import type ICustomConfirmationModal from "./ICustomConfirmationModal";
import { Button, Modal } from "antd";

const CustomConfirmationModal: React.FC<ICustomConfirmationModal> = ({ openModal, closeHandler, cancelButtonText, confirmButtonText, confirmationText, confirmationHandler }) => {

    return (
        <Modal open={openModal} onCancel={closeHandler} footer={[]} centered={true}>
            <div className="pt-4 px-2">
                <div className="pt-1">
                    <p className="text-lg font-medium text-[#343a40]">{confirmationText}</p>
                </div>
                <div className="flex justify-between p-2">
                    <Button onClick={closeHandler} style={{ padding: 0, margin: 0, border: "none" }}>
                        <p className="border-1 border-[#343a40] text-[#343a40] w-20 rounded-lg h-10 my-0 text-center flex items-center justify-center font-medium hover:bg-[#343a40] hover:text-white">{cancelButtonText}</p>
                    </Button>
                    <Button onClick={confirmationHandler} style={{ padding: 0, margin: 0, border: "none" }}>
                        <p className="border-1 border-[#343a40] bg-[#344e41] text-white w-auto p-1 rounded-lg h-10 my-0 text-center flex items-center justify-center font-medium hover:bg-[#343a40] hover:text-white">{confirmButtonText}</p>
                    </Button>
                </div>
            </div>
        </Modal>
    )
};

export default CustomConfirmationModal;