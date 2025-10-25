import React from "react";
import type IBanners from "./IBanners";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banners: React.FC<IBanners> = ({ imageURLs }) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 2000,
    };
    return (
        <div className="h-[450px] p-2">
            <Slider {...settings}>
                {imageURLs.map(url => (
                    <div className="w-full h-[450px] bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img
                            src={url}
                            alt="image"
                            className="object-contain"
                            style={{ maxHeight: '100%', width: '100%' }}
                            loading="lazy"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    )
};

export default Banners;