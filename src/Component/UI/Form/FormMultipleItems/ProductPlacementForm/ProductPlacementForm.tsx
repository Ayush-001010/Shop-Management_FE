import React, { useMemo } from "react";
import type IProductPlacementForm from "./IProductPlacementForm";
import RadioUI from "../../FormUI/InputUI/RadioUI/RadioUI";
import LabelUI from "../../FormUI/LabelUI/LabelUI";
import SelectUI from "../../FormUI/InputUI/SelectUI/SelectUI";
import { Button } from "antd";
import { useGetFormContextValue } from "../../Form";
import styles from "./ProductPlacementForm.module.css";


const ProductPlacementForm: React.FC<IProductPlacementForm> = ({ formik }) => {
    const isDisabledField = useMemo(() => { return !(formik.values["IsCustom"] !== null && formik.values["IsCustom"] === false) }, [formik.values["IsCustom"]]);
    const { customeFunc, options } = useGetFormContextValue();

    const clickHandler = async () => {
        const response = await customeFunc();
        if (response.success && response.data.find) {
            const { details } = response.data;
            formik.setFieldValue("RowNumber" , details.RowNumber);
            formik.setFieldValue("ColumnNumber",details.columnNumber);
            formik.setFieldValue("ContainerName",details.containerName);
        }
    }
    return (
        <div>
            <div>
                <div className="my-1">
                    <p className="text-lg">Should we take care of placing your product in a container?</p>
                    <RadioUI formik={formik} backendName="IsCustom" />
                </div>
                <div className="mt-4 grid grid-cols-2">
                    <div className="m-1">
                        <LabelUI>
                            Container Name
                        </LabelUI>
                        <SelectUI formik={formik} options={options["ContainerName"]} backendName="ContainerName" items={[]} isDisabled={isDisabledField} />
                    </div>
                    <div className="m-1">
                        <LabelUI>
                            Row Number
                        </LabelUI>
                        <SelectUI formik={formik} options={options["RowNumber"] || { RowNumber : [{label : formik.values["RowNumber"] , value : formik.values["RowNumber"] }] } } backendName="RowNumber" items={[]} isDisabled={isDisabledField} />
                    </div>
                    <div className="m-1">
                        <LabelUI>
                            Column Number
                        </LabelUI>
                        <SelectUI formik={formik} options={options["ColumnNumber"]} backendName="ColumnNumber" items={[]} isDisabled={isDisabledField} />
                    </div>
                </div>
            </div>
            {formik.values["IsCustom"] !== null && <div className="flex justify-center items-center mt-1">
                <Button className={styles.buttonCss} onClick={clickHandler}>{formik.values["IsCustom"] === true ? "Find a place" : "Check whether it's valid"}</Button>
            </div>}
        </div>
    )
};

export default ProductPlacementForm;