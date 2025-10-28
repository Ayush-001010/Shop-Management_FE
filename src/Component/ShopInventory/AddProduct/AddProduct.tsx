import React, { useState } from "react";
import type IAddProduct from "./IAddProduct";
import { Drawer } from "antd";
import Header from "./Header/Header";
import AddProductForm from "./AddProductForm/AddProductForm";
import Timeline from "./Timeline/Timeline";
import type IAddProductInterface from "../../../Services/Interface/AddProductInterface";
import ProductPlacementForm from "./ProductPlacementForm/ProductPlacementForm";
import Review from "./Review/Review";

const AddProduct: React.FC<IAddProduct> = ({ open, closeFunc }) => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [data, setData] = useState<IAddProductInterface>({
        Cost: 0,
        ExpiredDate: null,
        Height: 0,
        PerItemProfit: 0,
        ProductName: "",
        CategoryType: "",
        Quantity: 0,
        Width: 0,
        position: undefined,
        LowStock: null,
        ProductDescription: null,
        ProductPositioningInfo: null,
        ProductImages: [],
        Depth: null,
        SubCategoryType: ""
    });

    const changeTheStepHandler = (value: Record<string, any> | Array<{ RowNumber: number, ColumnNumber: number, RowIndex: number, ColumnIndex: number }>) => {
        switch (currentStep) {
            case 0: {
                value = value as Record<string, any>;
                setData({
                    ProductName: value.ProductName,
                    CategoryType: value.CategoryType,
                    Quantity: value.Quantity,
                    Cost: value.Cost,
                    PerItemProfit: value.PerItemProfit,
                    Height: value.Height,
                    Width: value.Width,
                    ExpiredDate: value.ExpiredDate,
                    position: undefined,
                    LowStock: value?.LowStock,
                    ProductDescription: value?.ProductDescription,
                    ProductPositioningInfo: value?.ProductPositioningInfo,
                    ProductImages: value?.ProductImages,
                    Depth: value?.Depth,
                    SubCategoryType: value.SubCategoryType
                })
                break;
            }
            case 1: {
                setData((prevState: IAddProductInterface) => {
                    prevState = { ...prevState, position: value as Array<{ RowNumber: number, ColumnNumber: number, RowIndex: number, ColumnIndex: number }> };
                    return { ...prevState };
                })
            }
        }
        setCurrentStep((prevState: number) => {
            return prevState + 1;
        });
    }
    const submitHandler = () => {
        console.log("Data   ", data);
    }
    return (
        <Drawer open={open} onClose={closeFunc} width={1200} title={<Header />}>
            <Timeline currentStep={currentStep} />
            <div className="mt-10">
                {currentStep === 0 && <AddProductForm changeTheStepHandler={changeTheStepHandler} currentStep={currentStep} />}
                {currentStep === 1 && <ProductPlacementForm changeTheStepHandler={changeTheStepHandler} />}
                {currentStep === 2 && <Review submitHandler={submitHandler} />}
            </div>
        </Drawer>
    )
};

export default AddProduct;