import { createSlice } from '@reduxjs/toolkit'
import type { IFormFieldInterface } from '../Services/Interface/FormFieldsInterface';

export interface IChatBoxReduxStateInterface {
    currentFormField: Array<IFormFieldInterface>;
    currentErrors: Record<string, string>;
    isLayoutAlreadyBuild: boolean;
    openCreateLayoutFunc: boolean;
}

const initialState: IChatBoxReduxStateInterface = {
    currentFormField: [],
    currentErrors: {},
    isLayoutAlreadyBuild: false,
    openCreateLayoutFunc: false
}

export const ChatBoxSlice = createSlice({
    name: 'chatbox',
    initialState,
    reducers: {
        setCurrentFormFields: (state, action) => {
            console.log("action ", action.payload);
            state.currentFormField = action.payload.currentFormField;
        },
        setCurrentFormFieldsError: (state, action) => {
            console.log("action ", action.payload);
            state.currentErrors = action.payload.currentErrors;
        },
        setIsLayoutAlreadyBuild: (state, action) => {
            state.isLayoutAlreadyBuild = action.payload.isLayoutAlreadyBuild;
        },
        setOpenCreateLayoutFunc: (state, _) => {
            state.openCreateLayoutFunc = true
        },
        setCloseCreateLayoutFunc: (state, _) => {
            state.openCreateLayoutFunc = false;
        }
    },
})


export const { setCurrentFormFields, setCurrentFormFieldsError, setIsLayoutAlreadyBuild, setOpenCreateLayoutFunc, setCloseCreateLayoutFunc } = ChatBoxSlice.actions

export default ChatBoxSlice.reducer