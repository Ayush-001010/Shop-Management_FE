import * as React from "react";
import { useState } from "react";
import type IDashboardForm from "./IDashboardForm";
import { Button, Modal } from "antd";
import { useGetDashboardContextValue } from "../../Dashboard";
import Form from "../../../Form/Form";
import type IFormFieldsInterface from "../../../../../Services/Interface/FormFieldsInterface";
import styles from "./DashboardForm.module.css";

const DashboardForm: React.FC<IDashboardForm> = () => {
    const {openFormButtonText , initialFormValue , formTitle , formFields : formConfig , formSubmitHandler} = useGetDashboardContextValue();
    const [open, setOpen] = useState<boolean>(false);

    const openModalHandler = () => setOpen(true);
    const closeModalHandler = () => setOpen(false);
    const submitHandler = (value: Record<string, any>) => {
        if (formSubmitHandler) {
            setOpen(false);
            formSubmitHandler(value);
        }
    }


    return (
        <div>
            <div className="m-1">
                <Button className={`${styles.buttonCss}`} onClick={openModalHandler}>{openFormButtonText}</Button>
            </div>
            {open &&
                <Modal open={open} onCancel={closeModalHandler} footer={null} width="90%">
                    <div>
                        <p className="text-2xl text-shadow-md">{formTitle}</p>
                    </div>
                    <Form fieldsDetails={formConfig as IFormFieldsInterface} isRowByRow={true} submitHandler={submitHandler} initialValues={initialFormValue} buttonText="Submit" />
                </Modal>
            }
        </div>
    )
};

export default DashboardForm;