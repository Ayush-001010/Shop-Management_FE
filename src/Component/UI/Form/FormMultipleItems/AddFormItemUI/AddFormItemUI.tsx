import React from "react";
import type IAddFormItemUI from "./IAddFormItemUI";
import { Button } from "antd";

const AddFormItemUI: React.FunctionComponent<IAddFormItemUI> = ({ increaseNoOfForms, formik  }) => {
    return (
        <div className="flex flex-row justify-end">
            <Button type="primary" shape="circle" size="large" onClick={() => increaseNoOfForms(formik.values)}>
                <i className="bi bi-plus-circle" />
            </Button>
        </div>
    )
};

export default AddFormItemUI;