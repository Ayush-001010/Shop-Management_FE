import React from "react";
import type IHeader from "./IHeader";
import { Button } from "antd";
import styles from "../Notes.module.css";
import { useGetNotesContext } from "../Notes";

const Header: React.FC<IHeader> = () => {
    const {openAddFormFunc} = useGetNotesContext();
    
    return (
        <div className="flex justify-between">
            <p className="text-lg font-medium text-[#212529] text-shadow-xs">Notes</p>
            <Button className={styles.addButtonCSS} onClick={openAddFormFunc}>
                <p className="m-0 text-[#212529] font-semibold">
                    <i className="bi bi-plus-lg m-0 p-0 text-[#212529] " />
                    Add
                </p>
            </Button>
        </div>
    )
};

export default Header;