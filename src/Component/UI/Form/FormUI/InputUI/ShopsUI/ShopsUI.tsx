import React from "react";
import type IShopsUI from "./IShopsUI";
import styles from "./ShopsUI.module.css";
import ErrorUI from "../../ErrorUI/ErrorUI";

const ShopsUI: React.FunctionComponent<IShopsUI> = ({ cardOptions, formik, backendName }) => {
    const changeHandler = (newvalue : string) => {
        formik.setFieldValue(backendName, newvalue);
    }
    return (
        <div>
            <div className="flex flex-row ">
                {cardOptions.map(option => (
                    <div className={`flex flex-col w-20 h-20 mx-10 ${styles.shopCardCss} ${formik.values[backendName] === option ? styles.active : ""}`} onClick={() => changeHandler(option)}>
                        <i className={`bi bi-shop-window ${styles.iconCss} ${formik.values[backendName] === option ? styles.active : ""}`}></i>
                        <span className={`text-sm font-normal ${styles.optionTextCss} ${formik.values[backendName] === option ? styles.active : ""}`}>{option}</span>
                    </div>
                ))}
            </div>
            <div className="pt-1 px-10">
                { formik.touched[backendName] && formik.errors[backendName] &&
                    <ErrorUI error={formik.errors[backendName] as string} />
                }
            </div>
        </div>
    )
};

export default ShopsUI;