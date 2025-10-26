import React, { useMemo } from "react";
import type IStartPage from "./IStartPage";
import { Link } from "react-router-dom";

const StartPage: React.FC<IStartPage> = () => {
    const timeTxt: string = useMemo(() => (new Date()).getHours() < 12 ? "morning" : (new Date()).getHours() < 17 ? "afternoon" : "evening", [])
    
    return (
        <div className="p-2">
            <div>
                <p className="font-normal text-[#212529] text-sm">Hi there! 👋 Good {timeTxt} and welcome to our platform. How can I assist you today? Do you already have an account
                    , or would you like to create a new one?</p>
            </div>
            <div className="flex flex-col justify-start items-start">
                <Link to="/createAccount" style={{ textDecoration: 'none' }}>
                    <p className="text-[#212529] bg-[#e9ecef] m-0 border-none p-1 font-semibold shadow-sm rounded-lg m-1">
                        Would you like to create a new one
                    </p>
                </Link>
                <Link to="/signIn" style={{ textDecoration: 'none' }}>
                    <p className="text-[#212529] bg-[#e9ecef] m-0 border-none p-1 font-semibold shadow-sm rounded-lg m-1">
                        Do you already have an account
                    </p>
                </Link>
            </div>
        </div>
    )
};

export default StartPage;