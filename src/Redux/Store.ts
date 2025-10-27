import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./User";
import ecomReducer from "./ECom";
import chatboxReducer from "./ChatBox";
import NotificationReducer from "./notifications";

export const store = configureStore({
  reducer: {
    user: userReducer,
    ecom: ecomReducer,
    chatbox: chatboxReducer,
    notification: NotificationReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch