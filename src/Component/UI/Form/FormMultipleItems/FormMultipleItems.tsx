import React from "react";
import type IFormMultipleItems from "./IFormMultipleItems";
import AddFormItemUI from "./AddFormItemUI/AddFormItemUI";
import ShopCardsItems from "./ShopCardsItems/ShopCardsItems";
import { useGetFormContextValue } from "../Form";
import ProductPlacementForm from "./ProductPlacementForm/ProductPlacementForm";

const FormMultipleItems: React.FunctionComponent<IFormMultipleItems> = ({ noOfForms, formFieldsConfig, formik, increaseNoOfForms, decreaseNoOfForms, options }) => {
    const { addFormItemUINotRequired } = useGetFormContextValue();

    return (
        <div>
            {!addFormItemUINotRequired && <AddFormItemUI increaseNoOfForms={increaseNoOfForms} formik={formik} />}
            {formFieldsConfig.formType === "shopcards" && (
                <div className="mt-4">
                    <ShopCardsItems noOfForms={noOfForms} formFieldsConfig={formFieldsConfig} formik={formik} decreaseNoOfForms={decreaseNoOfForms} options={options} />
                </div>
            )}
            {formFieldsConfig.formType === "shopusercards" && (
                <div className="mt-4">
                    <ShopCardsItems isUserDetailsRequired={true} noOfForms={noOfForms} formFieldsConfig={formFieldsConfig} formik={formik} decreaseNoOfForms={decreaseNoOfForms} options={options} />
                </div>
            )}
            {
                formFieldsConfig.formType === "productPlacement" && (
                    <ProductPlacementForm  formik={formik}/>
                )
            }
        </div>
    )
};

export default FormMultipleItems;