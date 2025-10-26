import { createSlice } from '@reduxjs/toolkit'
import type IShopDetailsInterface from '../Services/Interface/ShopDetailsInterface';
import type IOrganizationDetailsInterface from '../Services/Interface/OrganizationDetailsInterface';

export interface IUserState {
    userEmail: string;
    orgnizationDetails: IOrganizationDetailsInterface | null;
    shopDetails: Array<IShopDetailsInterface> | null;
    isLogIn: boolean;
    isAdmin: boolean;
    userImage: string;
    userName: string;
    userID: number | null;
    About: string;
}

const initialState: IUserState = {
    userEmail: "",
    orgnizationDetails: null,
    shopDetails: null,
    isLogIn: false,
    isAdmin: false,
    userImage: "",
    userName: "",
    userID: null,
    About: ""
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.orgnizationDetails = action.payload.orgnizationDetails;
            state.shopDetails = action.payload.ShopDetails;
            state.userID = action.payload.userID;
            state.userImage = action.payload.userImage;
            state.userName = action.payload.userName;
            state.About = action.payload.About;
            state.isLogIn = true;
            state.isAdmin = true;
        },
        setUserEmail: (state, action) => {
            state.userEmail = action.payload.userEmail;
            state.isLogIn = true;
            state.isAdmin = true;
        },
    },
})


export const { setUserDetails, setUserEmail } = UserSlice.actions

export default UserSlice.reducer