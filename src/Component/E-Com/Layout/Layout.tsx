import React, { useCallback, useEffect, useState } from "react";
import type ILayout from "./ILayout";
import { Button } from "antd";
import CreateLayout from "./CreateLayout/CreateLayout";
import { useDispatch, useSelector } from "react-redux";
import { setCloseCreateLayoutFunc, type IChatBoxReduxStateInterface } from "../../../Redux/ChatBox";

const Layout: React.FC<ILayout> = () => {
    const [open, setOpen] = useState<boolean>(false);
    const { openCreateLayoutFunc }: IChatBoxReduxStateInterface = useSelector((state: any) => state.chatbox);
    const dispatch = useDispatch();

    const openHandler = useCallback(() => {
        setOpen(true);
    }, []);
    const closeHandler = useCallback(() => {
        dispatch(setCloseCreateLayoutFunc({}));
        setOpen(false);
    }, []);

    useEffect(() => {
        if (openCreateLayoutFunc) {
            setOpen(true);
        }
    }, [openCreateLayoutFunc]);
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