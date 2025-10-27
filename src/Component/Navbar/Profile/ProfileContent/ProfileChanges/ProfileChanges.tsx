import React, { useCallback, useEffect, useRef, useState } from "react";
import type IProfileChanges from "./IProfileChanges";
import { Button, Input, message } from "antd";
import { useSelector } from "react-redux";
import CommonConfig from "../../../../../Services/Config/CommonConfig";
import useProfileChangeAction from "../../../../../Services/CustomHook/useProfileChangeAction";


const ProfileChanges: React.FC<IProfileChanges> = () => {
    const { userImage, userName, userEmail, userID, About } = useSelector((state: any) => state.user);
    const { userProfilePictureChange, userProfileChange } = useProfileChangeAction();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string>(userImage || "");
    const [name, setName] = useState<string>(userName || "");
    const [file, setFile] = useState<File | null>(null);
    const [changePassword, setChangePassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [about, setAbout] = useState<string>(About || "");
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [messageAPI, contextHandler] = message.useMessage();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setPreviewImage(imageURL);
        }
        setFile(file || null);
    };
    const changeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>, type: "name" | "password" | "changePassword" | "confirmPassword" | "about") => {
        if (type === "name") {
            setName(event.target.value);
        } else if (type === "password") {
            setPassword(event.target.value);
        } else if (type === "confirmPassword") {
            setConfirmPassword(event.target.value);
        } else if (type === "changePassword") {
            setChangePassword((prevState) => !prevState);
        } else if (type === "about") {
            setAbout(event.target.value);
        }
        return;
    }, []);

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };
    const saveChangesHandler = async () => {
        if (isDisabled) {
            messageAPI.destroy();
            messageAPI.error("No changes to save");
            return;
        }
        let imageURL = userImage;
        let userName = name;
        let password = confirmPassword ? confirmPassword : "";
        if (file) {
            const url = await userProfilePictureChange(file);
            imageURL = url;
        }
        const response = await userProfileChange(userID, userName, imageURL, password , about);
        if (response.success) {
            setTimeout(() => {
                location.reload();
            }, 100)
        } else {
            messageAPI.error(CommonConfig.errorMessage);
        }
    };

    useEffect(() => {
        if (name !== userName || (changePassword && password !== "" && confirmPassword !== "") || previewImage !== userImage || About !== about) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [name, password, confirmPassword, changePassword, previewImage, about]);

    return (
        <div className="w-full h-full">
            {contextHandler}
            <div className="p-2 h-20 border-b-1 border-[#ced4da]"></div>
            <div className="p-4 h-full">
                <div>
                    <div>
                        <p className="text-[#6c757d] font-medium m-0">Profile Picture</p>
                        <div className="flex my-1 items-center">
                            <div className="w-24 h-24 rounded-full overflow-hidden">
                                <img src={previewImage !== "" ? previewImage : CommonConfig.blankUserImage} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="ml-4">
                                <Button onClick={triggerFileInput} style={{ padding: 0, alignItems: "normal", border: "none" }}>
                                    <p className="m-0 bg-[#0077b6] text-white p-1 rounded-lg mx-1 hover:bg-[#023e8a]  hover:font-semibold">Change Picture</p>
                                </Button>
                                <Button onClick={() => setPreviewImage("")} style={{ padding: 0, alignItems: "normal", border: "none" }}>
                                    <p className="m-0 bg-[#ced4da] text-[#6a040f] p-1 rounded-lg mx-1 font-medium border-1 border-[#adb5bd] hover:text-[#370617] hover:bg-[#dee2e6] hover:font-semibold">Delete Picture</p>
                                </Button>
                                <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageChange} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <p className="text-[#6c757d] font-medium m-0">User Name</p>
                        <Input value={name} onChange={(e) => changeHandler(e, "name")} />
                    </div>
                    <div className="mt-2">
                        <p className="text-[#6c757d] font-medium m-0">User Email</p>
                        <Input value={userEmail} disabled={true} />
                    </div>
                    <div className="mt-2">
                        <p className="text-[#6c757d] font-medium m-0">About</p>
                        <Input.TextArea rows={4} value={about} onChange={(e) => changeHandler(e as any, "about")} />
                    </div>
                    <div className="mt-2">
                        <Button onClick={(e) => changeHandler(e as any, "changePassword")} style={{ padding: 0, alignItems: "normal", border: "none", boxShadow: "none", }}>
                            <p className="m-0 font-semibold  hover:underline hover:text-[#212529]">{changePassword ? "Don't Change Password" : "Want to Change Password?"}</p>
                        </Button>
                        {changePassword && (
                            <div className="p-1">
                                <div>
                                    <p className="text-[#6c757d] font-medium m-0">New Password</p>
                                    <Input type="password" value={password} onChange={(e) => changeHandler(e, "password")} />
                                </div>
                                <div>
                                    <p className="text-[#6c757d] font-medium m-0">Confirm New Password</p>
                                    <Input type="password" value={confirmPassword} onChange={(e) => changeHandler(e, "confirmPassword")} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-end mt-2 items-end">
                    <Button onClick={saveChangesHandler} className="p-1 border-none shadow-none text-white font-semibold" style={{ backgroundColor: "#212529" }}>
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProfileChanges;