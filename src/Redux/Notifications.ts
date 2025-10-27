import { createSlice } from '@reduxjs/toolkit'
import type INotificationMessageInterface from '../Services/Interface/NotificationInterface';

export interface INotificationReduxState {
    messages: Array<INotificationMessageInterface>
}

const initialState: INotificationReduxState = {
    messages: []
}

export const NotificationSlice = createSlice({
    name: 'ecom',
    initialState,
    reducers: {
        setNewMessages: (state, action) => {
            state.messages = action.payload.messages
        }
    },
})


export const { setNewMessages } = NotificationSlice.actions

export default NotificationSlice.reducer