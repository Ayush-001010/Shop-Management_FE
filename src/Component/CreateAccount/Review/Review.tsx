import React, { useState } from "react";
import type IReview from "./IReview";
import moment from "moment";
import ShopDetailsCard from "./ShopDetailsCard/ShopDetailsCard";
import { Button } from "antd";
import useCreateAccount from "../../../Services/CustomHook/useCreateAccount";
import SuccessfullyDoneModal from "../../UI/SuccessfullyDoneModal/SuccessfullyDoneModal";
import CreateAccountConfig from "../../../Services/Config/CreateAccountConfig";

const Review: React.FC<IReview> = ({ data }) => {
    const { createNewAccount } = useCreateAccount();
    const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);

    const clickHandler = async () => {
        const res = await createNewAccount(data);
        if (res.success) {
            setOpenSuccessModal(true);
        }
    }
    return (
        <div className="w-full px-5">
            <div className="text-center mb-6">
                <p className="text-4xl font-semibold text-gray-800">Review your details before submitting</p>
                <p className="mt-2 text-sm text-gray-600">
                    Before you hit confirm, take a moment to carefully review every detail. A quick double-check now can spare you from frustrating corrections, miscommunications, or wasted time later.
                </p>
            </div>

            <div className="border rounded-md shadow-sm p-4 bg-white">
                <div className="text-center mb-6">
                    <p className="text-2xl font-bold text-gray-900">
                        {data.OrganizationName}
                        <span className="text-sm font-normal ml-2 text-gray-600">
                            (Established by {data.FounderName})
                        </span>
                    </p>
                </div>

                <div className="mb-8">
                    <p className="text-lg font-semibold text-gray-800">Organization Details</p>
                    <hr className="my-2" />
                    <div className="flex flex-wrap gap-y-2">
                        <div className="w-1/2 text-gray-700 font-medium">Contact Number: <span className="text-gray-500">{data.ContactPhoneNumber}</span></div>
                        <div className="w-1/2 text-gray-700 font-medium">Contact Email: <span className="text-gray-500">{data.ContactEmail}</span></div>
                        <div className="w-1/2 text-gray-700 font-medium">Number Of Shops: <span className="text-gray-500">{data.shopDetails?.length}</span></div>
                        <div className="w-1/2 text-gray-700 font-medium">Founded Date: <span className="text-gray-500">{moment(data.FoundingDate).format("DD/MM/YYYY")}</span></div>
                        <div className="w-1/2 text-gray-700 font-medium">Organization Type: <span className="text-gray-500">{data.OrganizationType}</span></div>
                        <div className="w-1/2 text-gray-700 font-medium flex flex-wrap items-start">
                            Product Category:
                            {data.ProductCategories?.map((value, idx) => (
                                <span key={idx} className="text-sm mx-1 px-2 py-1 bg-gray-200 text-gray-700 rounded-full">{value}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <p className="text-lg font-semibold text-gray-800">Shop Details</p>
                    <hr className="my-2" />
                    <div className="h-60 overflow-y-auto bg-gray-100 rounded-md p-2">
                        {data.shopDetails?.map((details, index) => (
                            <ShopDetailsCard key={index} data={details} />
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <p className="text-lg font-semibold text-gray-800">Admin Details</p>
                    <hr className="my-2" />
                    <div className="flex flex-wrap gap-y-2">
                        <div className="w-1/2 text-gray-700">Admin User Name: <span className="text-gray-500">{data.adminDetails.adminUserName}</span></div>
                        <div className="w-1/2 text-gray-700">Admin Password: <span className="text-gray-500">{data.adminDetails.adminPassword}</span></div>
                        <div className="w-1/2 text-gray-700">Admin Confirm Password: <span className="text-gray-500">{data.adminDetails.adminConfirmPassword}</span></div>
                    </div>
                </div>
            </div>

            <div className="m-6 flex justify-center">
                <Button className="w-full" type="primary" onClick={clickHandler}>Confirm</Button>
            </div>
            <SuccessfullyDoneModal title={CreateAccountConfig.successfullCreationMessageTitle} open={openSuccessModal} description={CreateAccountConfig.successfullCreationDescriptionText} link="#/signIn" />
        </div>
    );
};

export default Review;
