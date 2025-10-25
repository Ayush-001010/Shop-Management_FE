import React from "react";
import type IProfileSideBar from "./IProfileSideBar";
import NavbarConfig from "../../../../Services/Config/NavbarConfig";
import type { IProfileSideBarInterface } from "../../../../Services/Interface/NavbarInterface";
import { useGetProfileSettingContext } from "../Profile";

const ProfileSideBar: React.FC<IProfileSideBar> = () => {
    const { currentView, changeCurrentView } = useGetProfileSettingContext();

    const activeTabHandler = (title: string) => {
        changeCurrentView(title);
    }
    return (
        <div className="border-r-1 border-solid border-[#ced4da]">
            <div className="p-2 h-20 w-60 flex items-center justify-center border-b-1 border-[#ced4da]">
                <p className="m-0 text-2xl text-[#212529] font-semibold">Settings</p>
            </div>
            <div className="flex flex-col mt-2">
                {NavbarConfig.profileSideBarConfig.map((item: IProfileSideBarInterface) => {
                    const { title, icon } = item;
                    return (
                        <div className={"flex h-15 p-2 items-center cursor-pointer group " + (currentView === title ? "bg-[#bbdefb] cursor-pointer border-r-2 border-solid border-[#023e8a]" : "hover:bg-[#e3f2fd]  hover:border-r-2 border-solid border-[#023e8a]")} onClick={() => activeTabHandler(title)}>
                            <p className="m-0">
                                <i className={`${icon} mr-2 text-base text-shadow-xs ` + (currentView === title ? "text-[#023e7d]" : "text-[#adb5bd] ")} />
                            </p>
                            <p className={"m-0 text-[#212529] font-normal text-base " + (currentView === title ? "font-semibold" : "group-hover:font-semibold")}>{title}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default ProfileSideBar;