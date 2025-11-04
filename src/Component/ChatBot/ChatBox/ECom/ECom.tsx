import React, { useMemo } from "react";
import type IECom from "./IECom";
import { useDispatch, useSelector } from "react-redux";
import { setOpenCreateLayoutFunc, type IChatBoxReduxStateInterface } from "../../../../Redux/ChatBox";
import { Button } from "antd";

const ECom: React.FC<IECom> = () => {
    const timeTxt: string = useMemo(() => (new Date()).getHours() < 12 ? "morning" : (new Date()).getHours() < 17 ? "afternoon" : "evening", [])
    const { isLayoutAlreadyBuild }: IChatBoxReduxStateInterface = useSelector((state: any) => state.chatbox);
    const dispatch = useDispatch();

    return (
        <div className="p-2">
            {isLayoutAlreadyBuild === false && (
                <div>
                    <p className="font-normal text-[#212529] text-sm">
                        Good {timeTxt}! I’m here to assist you. It looks like the layout for your e‑commerce page hasn’t been created yet.
                        Would you like to set it up now?
                    </p>
                    <div className="flex">
                        <Button style={{ border: "none", boxShadow: "none", padding: "0", margin: "0" }} onClick={() => dispatch(setOpenCreateLayoutFunc({}))}>
                            <p className="text-[#212529] bg-[#e9ecef] m-0 border-none p-1 font-semibold shadow-sm rounded-lg m-1 w-20">Yes</p>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
};

export default ECom;