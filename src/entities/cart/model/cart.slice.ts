import { createSlice } from '@reduxjs/toolkit';
import { Cart } from 'shared/types';
import { decrementProductInCartThunk, incrementProductInCartThunk, loadCartByUserIdThunk } from "./cart.thunks";

type CartState = {
    cartInfo: Cart | null
}

const initialState: CartState = {
    cartInfo: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadCartByUserIdThunk.fulfilled, (state: CartState, action) => {
            state.cartInfo = action.payload;
        });
        builder.addCase(loadCartByUserIdThunk.rejected, (state: CartState, action) => {
            console.log(action.error);
        });

        builder.addCase(incrementProductInCartThunk.fulfilled, (state: CartState, action) => {
            state.cartInfo = action.payload;
        });
        builder.addCase(incrementProductInCartThunk.rejected, (state: CartState, action) => {
            console.log('Increment error:', action.error)
        });

        builder.addCase(decrementProductInCartThunk.fulfilled, (state: CartState, action) => {
            state.cartInfo = action.payload;
        });
        builder.addCase(decrementProductInCartThunk.rejected, (state: CartState, action) => {
            console.log('Decrement error:', action.error)
        });
    },
});

export const { actions } = cartSlice;
export const cartReducer = cartSlice.reducer;
