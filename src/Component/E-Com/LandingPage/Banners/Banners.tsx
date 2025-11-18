import React from "react";
import type IBanners from "./IBanners";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banners: React.FC<IBanners> = ({ imageURLs }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 2000,
    };

    return (
        <div className="h-[450px]">
            <Slider {...settings}>
                {imageURLs.map((url, index) => (
                    <div
                        key={index}
                        className="w-full h-[350px] bg-gray-100 flex items-center justify-center overflow-hidden"
                    >
                        <img
                            src={url}
                            alt="banner"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Banners;
