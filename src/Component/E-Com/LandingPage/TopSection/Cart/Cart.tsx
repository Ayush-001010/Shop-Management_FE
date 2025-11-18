import React from "react";
import type ICart from "./ICart";

const Cart: React.FC<ICart> = () => {
    return (
        <div className="mx-1">
            <p className="flex justify-center items-center w-10 h-10 m-0 rounded-full bg-[#9d0208] text-white shadow-lg">
                <i className="bi bi-cart text-lg font-semibold" />
            </p>
        </div>
    )
};

export default Cart;