import React from "react";
import type IEditForm from "./IEditForm";
import { Modal } from "antd";
import { useGetDashboardContextValue } from "../../Dashboard";
import Form from "../../../Form/Form";
import type IFormFieldsInterface from "../../../../../Services/Interface/FormFieldsInterface";

const EditForm: React.FC<IEditForm> = () => {
    const { editFormFields, editFormInitialValues, closeEditForm, openEditForm, editFormTitle } = useGetDashboardContextValue();
    return (
        <Modal open={openEditForm} footer={null} width="90%" onCancel={() => closeEditForm("just-close")} centered>
            <div>
                <p className="text-2xl text-shadow-md">{editFormTitle}</p>
            </div>
            {(openEditForm && editFormFields) && (
                <Form initialValues={editFormInitialValues} fieldsDetails={editFormFields as IFormFieldsInterface} submitHandler={(value) => closeEditForm("update", {...value , ID : editFormInitialValues.ID , Status : editFormInitialValues.Status})} isRowByRow={true} buttonText="Update" />
            )}
        </Modal>
    )
};

export default EditForm;