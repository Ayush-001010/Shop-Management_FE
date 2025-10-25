import React from "react";
import type IFormConfirmation from "./IFormConfirmation";
import { Button, Modal } from "antd";
import { useGetFormContextValue } from "../Form";
import styles from "../Form.module.css";

const FormConfirmation: React.FC<IFormConfirmation> = () => {
    const { openFormConfirmation, decisionHandler } = useGetFormContextValue();
    return (
        <Modal  open={openFormConfirmation} footer={null} onCancel={() => decisionHandler(false)} centered>
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

export default FormConfirmation;