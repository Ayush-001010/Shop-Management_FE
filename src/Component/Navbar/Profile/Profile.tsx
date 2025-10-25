import React, { createContext } from "react";
import type IProfile from "./IProfile";
import { Modal } from "antd";
import ProfileSideBar from "./ProfileSideBar/ProfileSideBar";
import ProfileContent from "./ProfileContent/ProfileContent";

interface IProfileContext {
    currentView: string;
    changeCurrentView: (view: string) => void;
}

const ProfileSettingContext = createContext<IProfileContext | undefined>(undefined);

export const useGetProfileSettingContext = () => {
    const context = React.useContext(ProfileSettingContext);
    if (!context) {
        throw new Error("useGetProfileSettingContext must be used within a ProfileSettingProvider");
    }
    return context;
}

const Profile: React.FC<IProfile> = ({ open, onClose }) => {
    const [currentView, setCurrentView] = React.useState<string>("Profile");

    const changeCurrentView = (view: string) => {
        setCurrentView(view);
    }
    return (
        <ProfileSettingContext.Provider value={{ currentView, changeCurrentView }}>
            <Modal open={open} onCancel={onClose} footer={null} centered={true} height={750} width={900}>
                <div className="flex h-180">
                    <ProfileSideBar />
                    <ProfileContent />
                </div>
            </Modal>
        </ProfileSettingContext.Provider>
    );
};

export default Profile;
