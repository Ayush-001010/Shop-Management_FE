import React, { useEffect, useState } from 'react';
import type IFilters from './IFilters';
import DotSpinerLoader from '../../../UI/Loader/DotSpinerLoader/DotSpinerLoader';
import { message } from 'antd';
import CommonConfig from '../../../../Services/Config/CommonConfig';
import PriceRangeType from './Types/PriceRangeType/PriceRangeType';
import BrandType from './Types/BrandsType/BrandsType';
import SubCategoryType from './Types/SubCategoryType/SubCategoryType';
import DiscountType from './Types/DiscountType/DiscountType';
import NewArrivalType from './Types/NewArrivalType/NewArrivalType';
import useProductItemDashboardAction from '../../../../Services/CustomHook/useProductItemDashboardAction';

const Filters: React.FC<IFilters> = () => {
    const { getFilterItems } = useProductItemDashboardAction();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [messageAPI, contextHandler] = message.useMessage();
    const [sections, setSections] = useState<Array<"PriceRange" | "Brands" | "Discount" | "SubCategory" | "NewArrival">>([]);

    useEffect(() => {
        setIsLoading(true);
        getFilterItems("section").then((response: { success: boolean, data?: any }) => {
            if (response?.success) {
                const { Filters }: { Filters: string } = response?.data || {};
                const filterSectionData: Array<"PriceRange" | "Brands" | "Discount" | "SubCategory" | "NewArrival"> = Filters.split("||") as Array<"PriceRange" | "Brands" | "Discount" | "SubCategory" | "NewArrival">;
                setSections(filterSectionData);
            } else {
                messageAPI.error(CommonConfig.errorMessage);
            }
            setIsLoading(false);
        })
    }, []);

    return (
        <div className='w-xs mx-1'>
            <div className='fixed w-xs shadow-xs border-r border-[#001219] p-4 h-full overflow-auto'>
                {contextHandler}
                {isLoading && <DotSpinerLoader />}
                {sections.map((section: string) => {
                    switch (section) {
                        case "PriceRange": {
                            return <PriceRangeType />
                        }
                        case "Brands": {
                            return <BrandType />
                        }
                        case "SubCategory": {
                            return <SubCategoryType />
                        }
                        case "Discount": {
                            return <DiscountType />
                        }
                        case "NewArrival": {
                            return <NewArrivalType />
                        }
                        default: {
                            return null;
                        }
                    }
                })}
            </div>
        </div>
    )
};

export default Filters;