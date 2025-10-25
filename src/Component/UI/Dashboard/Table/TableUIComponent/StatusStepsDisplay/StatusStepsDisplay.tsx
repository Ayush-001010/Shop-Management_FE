import React from "react";
import type IStatusStepsDisplay from "./IStatusStepsDisplay";
import { Modal, Steps } from "antd";
import { useGetDashboardContextValue } from "../../../Dashboard";

const StatusStepsDisplay: React.FC<IStatusStepsDisplay> = () => {
    const { changeHandlerStatusStepHandler, openStatusStepModal } = useGetDashboardContextValue();
    return (
        <Modal open={openStatusStepModal.open} onCancel={() => changeHandlerStatusStepHandler({ open: false, items: [], val: 0 })} footer={null} centered>
            <div className="m-10">
                <Steps current={openStatusStepModal.val} items={openStatusStepModal.items} />
            </div>
        </Modal>
    )
};

export default StatusStepsDisplay;