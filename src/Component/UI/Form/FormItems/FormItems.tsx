import React, { useMemo } from "react";
import type IFormItems from "./IFormItems";
import LabelUI from "../FormUI/LabelUI/LabelUI";
import HelpfulDescriptionUI from "../FormUI/LabelUI/HelpfulDescriptionUI/HelpfulDescriptionUI";
import TextUI from "../FormUI/InputUI/TextUI/TextUI";
import EmailUI from "../FormUI/InputUI/EmailUI/EmailUI";
import ShopsUI from "../FormUI/InputUI/ShopsUI/ShopsUI";
import DateUI from "../FormUI/InputUI/DateUI/DateUI";
import SelectUI from "../FormUI/InputUI/SelectUI/SelectUI";
import { useGetFormContextValue } from "../Form";
import TextAreaUI from "../FormUI/InputUI/TextAreaUI/TextAreaUI";

const FormItems: React.FunctionComponent<IFormItems> = ({ items, formik, options }) => {
    const { isRowByRow } = useGetFormContextValue();

    const rowByRowFieldCss = useMemo(() => "flex flex-col", []);
    const sideBySideFieldCss = useMemo(() => "flex flex-row pt-1", []);
    return (
        <div className="container">
            {items.map(item => {
                return <div className={`grid ${item.type === "single" ? "grid-cols-1" : "grid-cols-2"} gap-4 mt-2`}>
                    {item.fields.map(field => {
                        const { displayName, minDate, textFieldType, cardOptions, backendName, helpfulDescription, placeholder, disabled, maxDate, isMultipleOptionSelect } = field;
                        switch (field.type) {
                            case "text": {
                                return (
                                    <div className={` ${isRowByRow ? rowByRowFieldCss : sideBySideFieldCss}`}>
                                        <LabelUI>
                                            <>
                                                {displayName}
                                                {helpfulDescription && <HelpfulDescriptionUI description={helpfulDescription} />}
                                            </>
                                        </LabelUI>
                                        <TextUI textFieldType={textFieldType} items={items} formik={formik} backendName={backendName} placeholder={placeholder} disabled={disabled} />
                                    </div>
                                )
                            }
                            case "email": {
                                return (
                                    <div className={` ${isRowByRow ? rowByRowFieldCss : sideBySideFieldCss}`}>
                                        <LabelUI>
                                            <>
                                                {displayName}
                                                {helpfulDescription && <HelpfulDescriptionUI description={helpfulDescription} />}
                                            </>
                                        </LabelUI>
                                        <EmailUI formik={formik} backendName={backendName} placeholder={placeholder} isDisabled={disabled} />
                                    </div>
                                )
                            }
                            case "shops": {
                                return (
                                    <div className={` ${isRowByRow ? rowByRowFieldCss : sideBySideFieldCss}`}>
                                        <LabelUI>
                                            <>
                                                {displayName}
                                                {helpfulDescription && <HelpfulDescriptionUI description={helpfulDescription} />}
                                            </>
                                        </LabelUI>
                                        <ShopsUI cardOptions={cardOptions || []} formik={formik} backendName={backendName} />
                                    </div>
                                )
                            }
                            case "date": {
                                return (
                                    <div className={` ${isRowByRow ? rowByRowFieldCss : sideBySideFieldCss}`}>
                                        <LabelUI>
                                            <>
                                                {displayName}
                                                {helpfulDescription && <HelpfulDescriptionUI description={helpfulDescription} />}
                                            </>
                                        </LabelUI>
                                        <DateUI placeholder={placeholder} maxDate={maxDate} formik={formik} backendName={backendName} disabled={disabled} minDate={minDate} />
                                    </div>
                                )
                            }
                            case "select": {
                                return (
                                    <div className={` ${isRowByRow ? rowByRowFieldCss : sideBySideFieldCss}`}>
                                        <LabelUI>
                                            <>
                                                {displayName}
                                                {helpfulDescription && <HelpfulDescriptionUI description={helpfulDescription} />}
                                            </>
                                        </LabelUI>
                                        <SelectUI isDisabled={disabled} items={items} placeholder={placeholder} options={options[backendName]} formik={formik} backendName={backendName} isMultipleOptionSelect={isMultipleOptionSelect} />
                                    </div>
                                )
                            }
                            case "textarea": {
                                return (
                                    <div className={` ${isRowByRow ? rowByRowFieldCss : sideBySideFieldCss}`}>
                                        <LabelUI>
                                            <>
                                                {displayName}
                                                {helpfulDescription && <HelpfulDescriptionUI description={helpfulDescription} />}
                                            </>
                                        </LabelUI>
                                        <TextAreaUI placeholder={placeholder} formik={formik} backendName={backendName} isDisabled={disabled} />
                                    </div>
                                )
                            }
                            case "password": {
                                return (
                                    <div className={` ${isRowByRow ? rowByRowFieldCss : sideBySideFieldCss}`}>
                                        <LabelUI>
                                            <>
                                                {displayName}
                                                {helpfulDescription && <HelpfulDescriptionUI description={helpfulDescription} />}
                                            </>
                                        </LabelUI>
                                        <TextUI textFieldType="password" items={items} formik={formik} backendName={backendName} placeholder={placeholder} disabled={disabled} />
                                    </div>
                                )
                            }
                            case "number": {
                                return (
                                    <div className={` ${isRowByRow ? rowByRowFieldCss : sideBySideFieldCss}`}>
                                        <LabelUI>
                                            <>
                                                {displayName}
                                                {helpfulDescription && <HelpfulDescriptionUI description={helpfulDescription} />}
                                            </>
                                        </LabelUI>
                                        <TextUI textFieldType="number" items={items} formik={formik} backendName={backendName} placeholder={placeholder} disabled={disabled} />
                                    </div>
                                )
                            }
                            default: {
                                return null;
                            }
                        }
                    })}
                </div>
            })}
        </div>
    )
};

export default FormItems;