import React from "react";
import type IBigTextDisplay from "./IBigTextDisplay";
import { Modal } from "antd";
import { useGetDashboardContextValue } from "../../../Dashboard";

const BigTextDisplay: React.FC<IBigTextDisplay> = () => {
    const { openBigTextModal, changeHandlerBigTextModal } = useGetDashboardContextValue();

    return (
        <Modal open={openBigTextModal.open} onCancel={() => changeHandlerBigTextModal({ open: false, text: "", propertyName: "" })} footer={null} centered>
            <div className="p-2">
                <p className="text-lg font-semibold">{openBigTextModal.propertyName}</p>
                <p className="font-light">{openBigTextModal.text}</p>
            </div>
        </Modal>
    )
};

export default BigTextDisplay;