import React from "react";
import type INote from "./INote";
import { useGetDashboardContextValue } from "../../../Dashboard";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Note: React.FC<INote> = ({ data }) => {
    const { changeHandlerBigTextModal, deleteNotesHandler } = useGetDashboardContextValue();
    const { setNodeRef, attributes, listeners, transition, transform } = useSortable({ id:data.id });
    

    const deleteHandler = () => {
        if (deleteNotesHandler) {
            deleteNotesHandler(data.ID);
        }
    }

    return (
        <div className="border rounded-lg m-1 h-20 flex items-center shadow-sm" ref={setNodeRef} style={{ transition, transform: CSS.Transform.toString(transform) }}>
            <div className="border mx-2 rounded-lg shadow-sm hover:cursor-pointer" {...attributes} {...listeners}>
                <p className="flex items-center mr-1 h-full m-0 w-5 cursor-grab" >
                    <i className={`bi bi-three-dots-vertical w-1 `} />
                    <i className={`bi bi-three-dots-vertical w-1 `} />
                </p>
            </div>
            <div className="w-full" onClick={() => changeHandlerBigTextModal({ open: true, text: data.Note, propertyName: "Note" })}>
                <p className="text-sm font-normal m-0 hover:underline cursor-pointer">{data.Note.split(" ").slice(0, 10).join(" ")} ...</p>
            </div>
            <div className="border mx-2 rounded-sm shadow-sm">
                <p className="m-0 cursor-pointer" onClick={deleteHandler}>
                    <i className="bi bi-trash-fill text-[#660708]" />
                </p>
            </div>
        </div>
    )
};

export default Note;