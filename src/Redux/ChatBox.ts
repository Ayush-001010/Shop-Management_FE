import { createSlice } from '@reduxjs/toolkit'
import type { IFormFieldInterface } from '../Services/Interface/FormFieldsInterface';

export interface IChatBoxReduxStateInterface {
    currentFormField: Array<IFormFieldInterface>;
    currentErrors: Record<string, string>;
}

const initialState: IChatBoxReduxStateInterface = {
    currentFormField: [],
    currentErrors: {}
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
        }
    },
})


export const { setCurrentFormFields , setCurrentFormFieldsError } = ChatBoxSlice.actions

export default ChatBoxSlice.reducer