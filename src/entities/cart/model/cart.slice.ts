import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, Product } from 'shared/types';
import {
  decrementProductInCartThunk,
  incrementProductInCartThunk,
  loadCartByUserIdThunk,
} from './cart.thunks';
import { decreaseProduct, increaseProduct } from '../lib';

type CartState = {
  cartInfo: Cart | null;
};

const initialState: CartState = {
  cartInfo: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    incrementProductInCart(state, action: PayloadAction<Product>) {
      if (state.cartInfo) {
        increaseProduct(state.cartInfo, action.payload);
      }
    },
    decrementProductInCart(state, action: PayloadAction<Product>) {
      if (state.cartInfo) {
        decreaseProduct(state.cartInfo, action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadCartByUserIdThunk.fulfilled,
      (state: CartState, action) => {
        state.cartInfo = action.payload;
      },
    );
    builder.addCase(
      loadCartByUserIdThunk.rejected,
      (state: CartState, action) => {
        console.log(action.error);
      },
    );

    builder.addCase(
      incrementProductInCartThunk.fulfilled,
      (state: CartState, action) => {
        // state.cartInfo = action.payload;
      },
    );
    builder.addCase(
      incrementProductInCartThunk.rejected,
      (state: CartState, action) => {
        // console.log('Increment error:', action.error);
      },
    );

    builder.addCase(
      decrementProductInCartThunk.fulfilled,
      (state: CartState, action) => {
        // state.cartInfo = action.payload;
      },
    );
    builder.addCase(
      decrementProductInCartThunk.rejected,
      (state: CartState, action) => {
        // console.log('Decrement error:', action.error);
      },
    );
  },
});

export const { actions } = cartSlice;
export const cartReducer = cartSlice.reducer;
