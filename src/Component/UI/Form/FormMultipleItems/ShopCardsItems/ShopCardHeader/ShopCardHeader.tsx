import React, { useEffect, useState } from 'react';
import type IShopCardHeader from './IShopCardHeader';
import TextUI from '../../../FormUI/InputUI/TextUI/TextUI';
import { Button, Tooltip } from 'antd';
import styles from "./ShopCardHeader.module.css";

const ShopCardHeader: React.FunctionComponent<IShopCardHeader> = ({ shopNumber, formik, formFieldsConfig, decreaseNoOfForms , isUserDetailsRequired }) => {
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<any>();

    const checkErrorOccoredOrNot = () => {
        let errorMsg: Array<string> = [];
        formFieldsConfig.sections.forEach(section => {
            section.fields.forEach(field => {
                const fieldName = `${field.backendName}_${shopNumber}`;
                if (formik.touched[fieldName] && formik.errors[fieldName]) {
                    setIsError(true);
                    errorMsg.push(formik.errors[fieldName] as string);
                }
            });
        });
        let errorDisplayText = <ul className="list-disc">
            {errorMsg.map((msg, index) => <li key={index}>{msg}</li>)}
        </ul>;
        setErrorMessage(errorDisplayText);
        if(errorMsg.length === 0) {
            setIsError(false);
            setErrorMessage("");
        }
    }

    useEffect(() => {
        checkErrorOccoredOrNot();
    }, [formik])
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row justify-between items-center mb-2'>
                <p className={`font-normal p-1 rounded-lg shadow-md ${styles.shopNumberCss}`}>
                    Shop Number :
                    <span className='font-bold ml-1'>
                        {shopNumber}
                    </span>
                </p>
                <div className='flex flex-row items-center justify-end gap-2'>
                    {isError &&
                        <Tooltip title={errorMessage} placement="topLeft">
                            <Button className={`text-red-500 ${styles.errorButtonCss}`} >
                                Error
                            </Button>
                        </Tooltip>
                    }
                    <Button className={`${styles.deleteButtonCss}`} shape='circle' onClick={() => decreaseNoOfForms(formik.values, shopNumber)} disabled={shopNumber === 1}>
                        <i className="bi bi-trash3-fill" />
                    </Button>
                </div>
            </div>
            <div className='w-xl'>
                <label>Shop Name</label>
                <TextUI items={[]} formik={formik} backendName={`shopname_${shopNumber}`} placeholder="Enter shop name" disabled={isUserDetailsRequired} />
            </div>
        </div>
    )
};


export default ShopCardHeader;