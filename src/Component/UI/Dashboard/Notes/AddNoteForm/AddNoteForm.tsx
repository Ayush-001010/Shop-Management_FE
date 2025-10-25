import React, { useEffect, useState } from "react";
import type IAddNoteForm from "./IAddNoteForm";
import { Button, Input, Modal } from "antd";
import { useGetNotesContext } from "../Notes";
import styles from "../Notes.module.css";
import useMessage from "antd/es/message/useMessage";

const AddNoteForm: React.FC<IAddNoteForm> = () => {
    const { openAddForm, closeAddFormFunc, addNotes } = useGetNotesContext();
    const [value, setValue] = useState<string>("");
    const [messageAPI, contextHandler] = useMessage();

    const changeHandler = ({ target }: any) => {
        setValue(target.value);
    }
    const sumbitHandler = () => {
        if (value.trim().length === 0) {
            messageAPI.error({ content: "Please enter a value before adding." });
            return;
        }
        addNotes(value);
    }

    useEffect(()=>{
        setValue("");
    },[openAddForm])
    
    return (
        <Modal open={openAddForm} onCancel={closeAddFormFunc} footer={[]}>
            {contextHandler}
            <div>
                <p className="text-lg font-medium text-[#212529] text-shadow-xs my-1">Add Note</p>
            </div>
            <div className="p-2">
                <div>
                    <p className="text-base font-medium text-[#343a40] m-0">Description</p>
                    <Input.TextArea value={value} onChange={changeHandler} />
                </div>
                <div className="mt-1 flex justify-end">
                    <Button className={styles.addButtonCSS} onClick={sumbitHandler}>
                        <p className="m-0 text-[#212529] font-semibold">
                            <i className="bi bi-plus-lg m-0 p-0 text-[#212529] " />
                            Add
                        </p>
                    </Button>
                </div>
            </div>
        </Modal>
    )
};

export default AddNoteForm;