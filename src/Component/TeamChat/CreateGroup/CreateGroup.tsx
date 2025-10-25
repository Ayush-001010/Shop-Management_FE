import React, { useCallback, useEffect, useRef, useState } from "react";
import type ICreateGroup from "./ICreateGroup";
import { Button, Input, message, Modal, Select } from "antd";
import { useGetTeamChatContext } from "../TeamChat";
import type { IOptionsInterface } from "../../../Services/Interface/CommonInterface";
import CommonConfig from "../../../Services/Config/CommonConfig";

const CreateGroup: React.FC<ICreateGroup> = ({ open, closeCreateGroup, submitHandlerFunc }) => {
    const { chatPersonDetails, pinnedChatPersonDetails } = useGetTeamChatContext();
    const [options, setOptions] = useState<Array<IOptionsInterface>>([]);
    const [groupName, setGroupName] = useState<string>("");
    const [groupAbout, setGroupAbout] = useState<string>("");
    const [messageAPI, contextHandler] = message.useMessage();
    const [groupPersons, setGroupPersons] = useState<Array<any>>([]);
    const [groupImage, setGroupImage] = useState<string>("");
    const [file, setFile] = useState<any>(null);
    const fileInp = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setGroupImage(imageURL);
        }
        setFile(file || null);
    };
    const changeHandlerOfGroupAbout = useCallback((e: any) => setGroupAbout(e.target.value), []);
    const changeHandlerOfGroupName = useCallback((e: any) => setGroupName(e.target.value), []);
    const changeHandlerOfGroupPersons = useCallback((newValue: any) => setGroupPersons(newValue), []);
    const submitHandler = async () => {
        messageAPI.destroy();
        if (groupName.trim().length === 0) {
            messageAPI.error({ content: "You can't create a group without providing a group name." });
            return;
        }
        if (groupPersons.length === 0) {
            messageAPI.error({ content: "Please select at least one user to create a group." });
            return;
        }
        if (groupAbout.trim().length === 0) {
            messageAPI.error({ content: "You can't create a group without providing a group about." });
            return;
        }
        messageAPI.loading(CommonConfig.loadingMessage);
        const response = await submitHandlerFunc(groupName, groupPersons, groupAbout, file);
        messageAPI.destroy();
        if (response.success) {
            closeCreateGroup();
            messageAPI.success({content : "Group created successfully."})
        } else {
            messageAPI.error(CommonConfig.errorMessage);
        }
    }
    const genrateOptions = useCallback(() => {
        const opt: Array<IOptionsInterface> = [];
        chatPersonDetails.forEach(item => {
            if (!item.GroupID && item.userName) {
                opt.push({ label: item.userName || "", value: item.ID })
            }
        });
        pinnedChatPersonDetails.forEach(item => {
            opt.push({ label: item.userName || "", value: item.ID })
        });
        setOptions(opt);
    }, [pinnedChatPersonDetails, chatPersonDetails]);

    useEffect(() => {
        genrateOptions();
    }, [chatPersonDetails, pinnedChatPersonDetails]);

    useEffect(() => {
        setGroupName("");
        setGroupPersons([]);
        setGroupAbout("");
        setFile(null);
        setGroupImage("");
    }, [open])
    return (
        <Modal footer={null} open={open} onCancel={closeCreateGroup}>
            {contextHandler}
            <div className="p-4">
                <div className="pt-1">
                    <div className="mt-1 flex">
                        <div className="w-24 h-24 rounded-full overflow-hidden">
                            <img className="w-full h-full object-cover" src={groupImage.length === 0 ? CommonConfig.blankUserImage : groupImage} alt="user" />
                        </div>
                        <div className="flex items-center">
                            <Button onClick={() => fileInp?.current?.click()} style={{ padding: 0, alignItems: "normal", border: "none" }}>
                                <p className="m-0 bg-[#0077b6] text-white p-1 rounded-lg mx-1 hover:bg-[#023e8a]  hover:font-semibold">Change Picture</p>
                            </Button>
                            <Button onClick={() => setGroupImage("")} style={{ padding: 0, alignItems: "normal", border: "none" }}>
                                <p className="m-0 bg-[#ced4da] text-[#6a040f] p-1 rounded-lg mx-1 font-medium border-1 border-[#adb5bd] hover:text-[#370617] hover:bg-[#dee2e6] hover:font-semibold">Delete Picture</p>
                            </Button>
                            <input ref={fileInp} type="file" onChange={handleImageChange} style={{ display: "none" }} />
                        </div>
                    </div>
                    <div className="w-full mt-1">
                        <p className="text-lg text-[#212529] font-normal my-0">Group Name</p>
                        <Input onChange={changeHandlerOfGroupName} value={groupName} />
                    </div>
                    <div className="w-full mt-2">
                        <p className="text-lg text-[#212529] font-normal my-0">Persons</p>
                        <Select className="w-full" mode="multiple" value={groupPersons} options={options} onChange={changeHandlerOfGroupPersons} />
                    </div>
                    <div className="mt-2">
                        <p className="text-lg text-[#212529] font-normal my-0">Group About</p>
                        <Input.TextArea rows={4} onChange={changeHandlerOfGroupAbout} value={groupAbout} />
                    </div>
                </div>
                <div className="mt-3 w-full flex items-center justify-center">
                    <Button style={{ padding: 0, margin: 0, border: "none" }} onClick={submitHandler}>
                        <p className="bg-[#008000] text-white w-40 p-1 rounded-lg shadow-sm hover:bg-[#004b23] font-medium">Create</p>
                    </Button>
                </div>
            </div>
        </Modal>
    )
};

export default CreateGroup;