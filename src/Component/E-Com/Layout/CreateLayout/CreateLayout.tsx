import React from "react";
import type ICreateLayout from "./ICreateLayout";
import { Modal } from "antd";
import Section from "./Section/Section";

const CreateLayout: React.FC<ICreateLayout> = ({ open, closeHandler }) => {

    return (
        <Modal open={open} onCancel={closeHandler} footer={null} width={1000} height={700} centered >
            <div className="p-2">
                <Section />
            </div>
        </Modal>
    )
};

export default CreateLayout;