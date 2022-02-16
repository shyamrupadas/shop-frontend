import { createAsyncThunk } from '@reduxjs/toolkit';
import { cartApi } from 'shared/api/cart';
import { Product, UserId } from 'shared/types';
import { RootState } from 'store/store';
import { cartModel } from '..';

export const loadCartByUserIdThunk = createAsyncThunk(
  'cart/loadCartByUserIdThunk',
  async (userId: UserId, thunkApi) => {
    return await cartApi.fetchCartByUserId(userId);
  },
);

export const incrementProductInCartThunk = createAsyncThunk<
  void,
  Product,
  { state: RootState }
>('cart/incrementProductInCartThunk', async (product: Product, thunkApi) => {
  thunkApi.dispatch(cartModel.actions.incrementProductInCart(product));
});

export const decrementProductInCartThunk = createAsyncThunk<
  void,
  Product,
  { state: RootState }
>('cart/decrementProductInCartThunk', async (product: Product, thunkApi) => {
  thunkApi.dispatch(cartModel.actions.decrementProductInCart(product));
});

export const resetCartThunk = createAsyncThunk(
  'cart/resetCartThunk',
  async (userId: UserId, thunkApi) => {
    await cartApi.updateCartByUserId(userId, []);
    thunkApi.dispatch(loadCartByUserIdThunk(userId));
  },
);
