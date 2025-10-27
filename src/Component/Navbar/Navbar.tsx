import React, { useCallback } from "react";
import type INavbar from "./INavbar";
import styles from "./Navbar.module.css";
import CommonConfig from "../../Services/Config/CommonConfig";
import { Link } from "react-router-dom";
import NavbarConfig from "../../Services/Config/NavbarConfig";
import type INavbarInterface from "../../Services/Interface/NavbarInterface";
import { useSelector } from "react-redux";
import { useState } from "react";
import Profile from "./Profile/Profile";
import { Popover } from "antd";
import Notification from "./Notification/Notification";

const Navbar: React.FunctionComponent<INavbar> = () => {
    const { isLogIn, userEmail, userImage, userName } = useSelector((state: any) => state.user);
    const [openProfile, setOpenProfile] = useState<boolean>(false);

    const openProfileHandler = useCallback(() => setOpenProfile(true), []);
    const closeProfileHandler = useCallback(() => setOpenProfile(false), []);


    return (
        <div className={"m-2 p-1 h-15  rounded-sm flex items-center bg-[#dee2e6] shadow-xs "}>
            <div className="w-55 p-1 ">
                <Link to="/" className={styles.linkTagCss}>
                    <p className={`m-0 text-[#212529] font-semibold w-full ${styles.CompanyTextCss}`}>
                        <i className={`bi bi-shop mr-1 ${styles.iconCSS} text-lg`} />
                        {CommonConfig.companyName}
                    </p>
                </Link>
            </div>
            {isLogIn && <div className="w-full flex justify-end items-center">
                <>
                    {NavbarConfig.config.map((item: INavbarInterface) => {
                        const { title, link } = item;
                        return <Link to={link} className={styles.navLinkTextCss}>
                            <p className={`px-1 mx-1 my-0 font-medium rounded-lg p-1 text-[#343a40] hover:bg-[#f8f9fa] cursor-pointer hover:font-semibold`}>
                                {title}
                            </p>
                        </Link>
                    })}
                </>
                <Popover placement="bottom" content={<Notification />}>
                    <div className="mx-1 bg-[#f8f9fa] rounded-4xl cursor-pointer">
                        <p className="m-0 text-xl p-2">
                            <i className="bi bi-bell" />
                        </p>
                    </div>
                </Popover>
                <div className="my-0 ml-1 p-1 font-medium items-center flex bg-[#f8f9fa] rounded-xl cursor-pointer hover:bg-[#e9ecef]" onClick={openProfileHandler}>
                    <p className="m-0 w-10 h-10 rounded-full overflow-hidden">
                        <img src={(!userImage || userImage.trim().length === 0) ? CommonConfig.blankUserImage : userImage} alt="Profile" className="w-full h-full object-cover" />
                    </p>
                    <div className="flex flex-col ml-1">
                        <p className="m-0 text-base text-[#212529]">{userName}</p>
                        <p className="m-0 text-xs text-[#495057]">{userEmail}</p>
                    </div>
                </div>
            </div>}
            <Profile open={openProfile} onClose={closeProfileHandler} />
        </div>
    )
};

export default Navbar;