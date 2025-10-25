import React, { createContext, useContext, useState } from "react";
import type INotes from "./INotes";
import Header from "./Header/Header";
import AddNoteForm from "./AddNoteForm/AddNoteForm";
import { useGetDashboardContextValue } from "../Dashboard";
import Content from "./Content/Content";

interface INotesContext {
    openAddForm: boolean;
    closeAddFormFunc: () => void;
    openAddFormFunc: () => void;
    addNotes: (Note: string) => void;
}

const NotesContext = createContext<INotesContext | undefined>(undefined);

export const useGetNotesContext = () => {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error("Error On Getting Context");
    }
    return context;
}

const Notes: React.FC<INotes> = () => {
    const [openAddForm, setOpenAddForm] = useState<boolean>(false);
    const { addNotes } = useGetDashboardContextValue();

    const openAddFormFunc = () => setOpenAddForm(true);
    const closeAddFormFunc = () => setOpenAddForm(false);
    const addNoteHandler = (newValue: string) => {
        setOpenAddForm(false);
        if (addNotes) {
            addNotes(newValue);
        }
    }
    return (
        <NotesContext.Provider value={{ openAddForm, openAddFormFunc, closeAddFormFunc, addNotes: addNoteHandler }}>
            <div className="w-108 m-1 shadow-sm rounded-lg border p-1">
                <Header />
                <Content />
            </div>
            <AddNoteForm />
        </NotesContext.Provider>
    )
};

export default Notes;