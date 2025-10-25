import React from "react";
import type IShopCardContent from "./IShopCardContent";
import LabelUI from "../../../FormUI/LabelUI/LabelUI";
import SelectUI from "../../../FormUI/InputUI/SelectUI/SelectUI";
import TextAreaUI from "../../../FormUI/InputUI/TextAreaUI/TextAreaUI";
import TextUI from "../../../FormUI/InputUI/TextUI/TextUI";
import EmailUI from "../../../FormUI/InputUI/EmailUI/EmailUI";
import DateUI from "../../../FormUI/InputUI/DateUI/DateUI";
import dayjs from "dayjs";
import PasswordUI from "../../../FormUI/InputUI/PasswordUI/PasswordUI";

const ShopCardContent: React.FunctionComponent<IShopCardContent> = ({ items, formik, shopNumber, options, isUserDetailsRequired }) => {
    const today = dayjs();
    return (
        <div className="container">
            <div className="flex flex-row gap-4">
                <div className="flex flex-col w-full">
                    <LabelUI>
                        State
                    </LabelUI>
                    <SelectUI items={items} backendName={`state_${shopNumber}`} placeholder="Ex-Maharashtra" isDisabled={isUserDetailsRequired} formik={formik} options={options.state} />
                </div>
                <div className="flex flex-col w-full">
                    <LabelUI>
                        City
                    </LabelUI>
                    <SelectUI items={items} backendName={`city_${shopNumber}`} placeholder="Ex-Maharashtra" isDisabled={isUserDetailsRequired} formik={formik} options={options.city} />
                </div>
            </div>
            <div className="pt-1">
                <LabelUI>
                    Address
                </LabelUI>
                <TextAreaUI formik={formik} backendName={`address_${shopNumber}`} placeholder="Ex- Viman Nagar , Pune" isDisabled={isUserDetailsRequired} />
            </div>
            <div className="flex flex-row gap-4 pt-1">
                <div className="flex flex-col w-full">
                    <LabelUI>
                        Contact Number
                    </LabelUI>
                    <TextUI items={items} formik={formik} backendName={`shopcontactnumber_${shopNumber}`} placeholder="Ex-9876543210" disabled={isUserDetailsRequired} />
                </div>
                <div className="flex flex-col w-full">
                    <LabelUI>
                        Email
                    </LabelUI>
                    <EmailUI formik={formik} backendName={`shopemail_${shopNumber}`} placeholder="Ex- testing@gmail.com" isDisabled={isUserDetailsRequired} />
                </div>
            </div>
            <div className="flex flex-row gap-4 pt-1">
                <div className="flex flex-col w-full">
                    <LabelUI>
                        Type
                    </LabelUI>
                    <SelectUI items={items} backendName={`shoptype_${shopNumber}`} placeholder="Ex-Owned" formik={formik} options={options.shoptype} isDisabled={isUserDetailsRequired} />
                </div>
                <div className="flex flex-col w-full">
                    <LabelUI>
                        Lease Owner Name
                    </LabelUI>
                    <TextUI items={items} formik={formik} backendName={`leaseownername_${shopNumber}`} placeholder="Ex-Jhon" disabled={true} disabledFieldValueDependsOn={isUserDetailsRequired ? undefined : `shoptype_${shopNumber}`} disabledFieldValue="leased" />
                </div>
            </div>
            <div className="flex flex-row gap-4 pt-1">
                <div className="flex flex-col w-full">
                    <LabelUI>
                        Lease Start Date
                    </LabelUI>
                    <DateUI maxDate={today} placeholder="Select Lease Start Date" formik={formik} backendName={`leasestartdate_${shopNumber}`} disabled={true} disabledFieldValueDependsOn={isUserDetailsRequired ? undefined : `shoptype_${shopNumber}`} disabledFieldValue="leased" />
                </div>
                <div className="flex flex-col w-full">
                    <LabelUI>
                        Lease End Date
                    </LabelUI>
                    <DateUI maxDate={today} placeholder="Select Lease Start Date" formik={formik} backendName={`leaseenddate_${shopNumber}`} disabled={true} disabledFieldValueDependsOn={isUserDetailsRequired ? undefined : `shoptype_${shopNumber}`} disabledFieldValue="leased" />
                </div>
            </div>
            {isUserDetailsRequired && <>
                <div className="flex flex-row gap-4 pt-1">
                    <div className="flex flex-col w-full">
                        <LabelUI>
                            User Name
                        </LabelUI>
                        <TextUI items={items} formik={formik} backendName={`userName_${shopNumber}`} placeholder="Ex-Jhon" />
                    </div>
                    <div className="flex flex-col w-full">
                        <LabelUI>
                            User Password
                        </LabelUI>
                        <PasswordUI formik={formik} backendName={`userpassword_${shopNumber}`} placeholder="Ex-Jhon" />
                    </div>
                </div>
                <div className="flex flex-row gap-4 pt-1">
                    <div className="flex flex-col w-full">
                        <LabelUI>
                            Confirm Password
                        </LabelUI>
                        <PasswordUI formik={formik} backendName={`userconfirmpassword_${shopNumber}`} placeholder="Ex-Jhon" />
                    </div>
                    <div className="flex flex-col w-full">
                        <LabelUI>
                            User Email
                        </LabelUI>
                        <EmailUI formik={formik} backendName={`userEmail_${shopNumber}`} placeholder="" />
                    </div>
                </div>
                <div className="flex flex-row gap-4 pt-1">
                    <div className="flex flex-col w-full">
                        <LabelUI>
                            User Contact Number
                        </LabelUI>
                        <TextUI items={items} formik={formik} backendName={`userphonenumber_${shopNumber}`} placeholder="Ex-Jhon" />
                    </div>
                </div>
            </>}
        </div>
    )
};

export default ShopCardContent;