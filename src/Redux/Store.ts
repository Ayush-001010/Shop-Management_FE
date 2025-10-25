import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./User";
import ecomReducer from "./ECom";

export const store = configureStore({
  reducer: {
    user : userReducer,
    ecom : ecomReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch