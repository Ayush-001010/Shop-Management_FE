import React from "react";
import type ICart from "./ICart";

const Cart: React.FC<ICart> = () => {
    return (
        <div className="mx-1">
            <p className="flex justify-center  items-center w-10 h-10 m-0 rounded-lg bg-[#023e8a] text-white shadow-xl cursor-pointer">
                <i className="bi bi-cart text-lg font-semibold" />
            </p>
        </div>
    )
};

export default Cart;