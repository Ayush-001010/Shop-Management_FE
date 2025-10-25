import React from "react";
import type IAddProductForm from "./IAddProductForm";
import Form from "../../../UI/Form/Form";
import AddProductConfig from "../../../../Services/Config/AddProductConfig";

const AddProductForm: React.FC<IAddProductForm> = ({ changeTheStepHandler, currentStep }) => {
    const submitHandler = async (value: Record<string, any>) => {
        changeTheStepHandler(value);
    }
    return (
        <div>
            <div>
                <p className="text-sm  font-semibold underline">{currentStep === 0 ? "Product Details:" : currentStep === 1 ? "Product Placement:" : ""}</p>
            </div>
            <Form fieldsDetails={AddProductConfig.productDetailsFormConfig} submitHandler={submitHandler} buttonText="Next" isRowByRow={true} notRequiredConfirmationDialog={true} />
        </div>
    )
};

export default AddProductForm;