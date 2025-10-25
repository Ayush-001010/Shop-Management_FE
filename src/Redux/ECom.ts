import { createSlice } from '@reduxjs/toolkit'
import type { IItemLayoutItemface } from '../Services/Interface/LayoutInterface';
import type ISectionLayoutInterface from '../Services/Interface/LayoutInterface';

export interface IEcomReduxState {
    isLayoutExist: boolean | null;
    currentShopID?: number;
    itemSchema?: IItemLayoutItemface;
    sectionSchema?: Array<ISectionLayoutInterface>;
}

const initialState: IEcomReduxState = {
    isLayoutExist: null,
    currentShopID: undefined
}

export const EComSlice = createSlice({
    name: 'ecom',
    initialState,
    reducers: {
        setReduxState: (state, action) => {
            state.isLayoutExist = action.payload.isLayoutExist;
            state.currentShopID = action.payload?.currentShopID;
        },
        setLayoutSchema: (state, action) => {
            state.sectionSchema = action.payload.sectionSchema;
            state.itemSchema = action.payload.itemSchema;
        }
    },
})


export const { setReduxState, setLayoutSchema } = EComSlice.actions

export default EComSlice.reducer