import React from "react";
import type IConfirmation from "./IConfirmation";
import { Button, Modal } from "antd";
import styles from "./Confirmation.module.css";

const Confirmation: React.FC<IConfirmation> = ({ openFormConfirmation, decisionHandler }) => {
    return (
        <Modal open={openFormConfirmation} footer={null} onCancel={() => decisionHandler(false)} centered>
            <div>
                <div className="flex justify-start">
                    <p className="text-shadow-sm text-lg">Once completed, this cannot be reversed. Confirm?</p>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                    <Button className={`w-20 ${styles.NoButtonCss}`} onClick={() => decisionHandler(false)}>No</Button>
                    <Button className={`w-20 ${styles.YesButtonCss}`} onClick={() => decisionHandler(true)}>Yes</Button>
                </div>
            </div>
        </Modal>
    )
};

export default Confirmation;