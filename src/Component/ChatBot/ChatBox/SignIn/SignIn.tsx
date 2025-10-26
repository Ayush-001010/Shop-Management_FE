import React, { useMemo } from "react";
import type ISignIn from "./ISignIn";

const SignIn: React.FC<ISignIn> = () => {
    const timeTxt: string = useMemo(() => (new Date()).getHours() < 12 ? "morning" : (new Date()).getHours() < 17 ? "afternoon" : "evening", [])
    
    return (
        <div>
            <p className="font-normal text-[#212529] text-sm">
                Hi, good {timeTxt}! I’m sorry, but I’m unable to assist with anything related to the sign-in process.
            </p>
        </div>
    )
};

export default SignIn;