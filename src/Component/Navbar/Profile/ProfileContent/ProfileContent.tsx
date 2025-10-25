import React from "react";
import type IProfileContent from "./IProfileContent";
import { useGetProfileSettingContext } from "../Profile";
import ProfileChanges from "./ProfileChanges/ProfileChanges";

const ProfileContent: React.FC<IProfileContent> = () => {
    const { currentView } = useGetProfileSettingContext();
    return (
        <div className="w-full h-full">
            {currentView === "Profile" && <ProfileChanges />}
        </div>
    )
};

export default ProfileContent;
