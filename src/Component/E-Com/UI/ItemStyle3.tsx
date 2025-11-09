import React, { useMemo } from "react";
import type IItemStyle3 from "./IItemStyle3";
import { Button } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ItemStyle3: React.FC<IItemStyle3> = ({ data }) => {
    var settings = useMemo(() => {
        return {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            // autoplay: true,
            // autoplaySpeed: 2000,
        }
    }, []);
    return (
        <div className="mx-2 shadow-sm w-md">
            <div className="w-md">
                <Slider {...settings}>
                    {data.ProductImagesURL?.map((url, index) => (
                        <div key={index} className="w-md h-72 rounded-t-lg flex overflow-hidden">
                            <img src={url} alt={`product-${index}`} loading="lazy" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="mt-4">
                <div className="flex items-center">
                    <p className="text-sm m-0 mx-1 font-semibold text-[#495057]">{data.ProductName}</p>
                    <p className="text-sm m-0 mx-1 font-semibold text-[#495057]">|</p>
                    <p className="text-xs m-0 mx-1 font-medium text-[#495057]">{data.ProductDescription}</p>
                </div>
                <div className="mt-1">
                    <p className="font-light text-sm text-[#6c757d] m-1">{data.CostToBuy + data.PerItemProfit} Rs</p>
                </div>
                <div className="m-2">
                    <Button style={{ border: "none", boxShadow: "none", padding: 0, margin: 0 }}>
                        <p className="m-0 bg-[#6c757d] w-20 h-10 rounded-lg shadow-sm flex justify-center items-center text-white hover:bg-[#495057]">
                            <i className="bi bi-plus-lg text-lg" />
                        </p>
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default ItemStyle3;