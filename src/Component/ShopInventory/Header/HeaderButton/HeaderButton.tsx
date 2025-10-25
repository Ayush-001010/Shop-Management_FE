import React from "react";
import type IHeaderButton from "./IHeaderButton";
import { Button } from "antd";
import styles from "../../ShopInventory.module.css";

const HeaderButton: React.FC<IHeaderButton> = ({ openAddContainerFormFunc, openAddProductFormFunc }) => {
    return (
        <div className="flex">
            <Button className={`mx-1 font-medium ${styles.headerButtonCSS}`} onClick={openAddContainerFormFunc}>Add New Container</Button>
            <Button className={`mx-1 font-medium ${styles.headerButtonCSS}`} onClick={openAddProductFormFunc}>Add New Product</Button>
        </div>
    )
};

export default HeaderButton;