import React, { useState } from "react";
import type ILayout from "./ILayout";
import { Button } from "antd";
import CreateLayout from "./CreateLayout/CreateLayout";

const Layout: React.FC<ILayout> = () => {
    const [open, setOpen] = useState<boolean>(false);

    const openHandler = () => setOpen(true);
    const closeHandler = () => {
        setOpen(false);
    }
    return (
        <div className="w-full h-full flex justify-center items-center">
            <Button style={{ padding: "0", border: "none", boxShadow: "none" }} onClick={openHandler}>
                <p className="text-lg text-white bg-[#003459] p-2 rounded-lg shadow-md w-60 delay-200 transition duration-400 hover:bg-[#00171f]">
                    Build Layout
                </p>
            </Button>
            <CreateLayout open={open} closeHandler={closeHandler} />
        </div>
    )
};

export default Layout;