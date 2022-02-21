import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, Product, ProductId } from 'shared/types';
import { debounceCartThunk, loadCartByUserIdThunk } from './cart.thunks';
import { decreaseProduct, increaseProduct } from '../lib';

type CartNotification = null | {
  overstockedProductsIds: ProductId[];
};

type CartState = {
  cartInfo: Cart | null;
  notification: CartNotification;
};

const initialState: CartState = {
  cartInfo: null,
  notification: null,
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
    resetNotification(state) {
      state.notification = null;
    },
    allowAddToCart(state, action: PayloadAction<ProductId>) {
      if (state.cartInfo) {
        const cartProduct = state.cartInfo.products.find((cartProduct) => {
          return cartProduct.product._id === action.payload;
        });

        if (cartProduct) {
          cartProduct.isMaxCount = false;
        }
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

    builder.addCase(debounceCartThunk.fulfilled, (state: CartState, action) => {
      const cart = state.cartInfo;
      const cartFromServer = action.payload;
      const productsOverflow = cartFromServer.productsOverflow;

      if (!cart || !productsOverflow.length) {
        return;
      }

      const productsOverflowMap = new Map(
        productsOverflow?.map((productId) => [productId, productId]),
      );

      productsOverflow.forEach((productId) => {
        const cartProduct = cart.products.find((cartProduct) => {
          return cartProduct.product._id === productId;
        });

        const cartProductFromResponse = cartFromServer.products.find(
          (cartProduct) => {
            return cartProduct.product._id === productId;
          },
        );

        if (!cartProduct || !cartProductFromResponse) {
          return;
        }

        if (cartProduct.count > cartProductFromResponse.count) {
          cartProduct.count = cartProductFromResponse.count;
          cartProduct.isMaxCount = true;
          state.notification = {
            overstockedProductsIds: Array.from(productsOverflowMap.values()),
          };
        } else {
          productsOverflowMap.delete(productId);
        }
      });
    });
  },
});

export const { actions } = cartSlice;
export const cartReducer = cartSlice.reducer;
