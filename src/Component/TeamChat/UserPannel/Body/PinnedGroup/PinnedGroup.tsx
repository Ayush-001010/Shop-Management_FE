import React from "react";
import type IPinnedGroup from "./IPinnedGroup";
import { useGetTeamChatContext } from "../../../TeamChat";
import PersonCard from "../PersonCard/PersonCard";

const PinnedGroup: React.FC<IPinnedGroup> = () => {
    const { pinnedChatPersonDetails } = useGetTeamChatContext();

    return (
        <div className="mt-2 ">
            <div className="flex justify-between">
                <p className="text-[#6c757d] font-normal">Pinned Message</p>
                <p><i className="bi bi-pin-fill text-[#6c757d]" /></p>
            </div>
            <div>
                {pinnedChatPersonDetails.length === 0 && <div>
                    <p className="my-0 text-sm text-[#adb5bd] font-medium text-center">There are no pinned messages.</p>
                </div>}
                {pinnedChatPersonDetails.map((person: any) => {
                    return <PersonCard personDetails={person} isPinned={true} />
                })}
            </div>
        </div>
    )
};

export default PinnedGroup;