import { createAsyncThunk } from '@reduxjs/toolkit';
import { cartApi } from 'shared/api/cart';
import { Cart, Product, UserId } from 'shared/types';
import { RootState } from 'store/store';
import { cartModel } from '..';
import { debounce } from './debounce';

export const loadCartByUserIdThunk = createAsyncThunk(
  'cart/loadCartByUserIdThunk',
  async (userId: UserId, thunkApi) => {
    return await cartApi.fetchCartByUserId(userId);
  },
);

export const debounceCartThunk = createAsyncThunk<
  Cart,
  UserId,
  { state: RootState }
>('cart/debounceCartThunk', async (userId: UserId, thunkApi) => {
  const cartUpdateData = cartModel.selectors.cartProductsForUpdate(
    thunkApi.getState(),
  );
  return await cartApi.updateCartByUserId(
    userId,
    Array.from(cartUpdateData.values()),
  );
});

export const incrementProductInCartThunk = createAsyncThunk<
  void,
  Product,
  { state: RootState }
>('cart/incrementProductInCartThunk', async (product: Product, thunkApi) => {
  const userId = thunkApi.getState().user.userInfo._id;
  thunkApi.dispatch(cartModel.actions.incrementProductInCart(product));
  debounce(userId, thunkApi.dispatch, debounceCartThunk);
});

export const decrementProductInCartThunk = createAsyncThunk<
  void,
  Product,
  { state: RootState }
>('cart/decrementProductInCartThunk', async (product: Product, thunkApi) => {
  const userId = thunkApi.getState().user.userInfo._id;
  thunkApi.dispatch(cartModel.actions.decrementProductInCart(product));
  debounce(userId, thunkApi.dispatch, debounceCartThunk);
});

export const resetCartThunk = createAsyncThunk(
  'cart/resetCartThunk',
  async (userId: UserId, thunkApi) => {
    await cartApi.updateCartByUserId(userId, []);
    thunkApi.dispatch(loadCartByUserIdThunk(userId));
  },
);
