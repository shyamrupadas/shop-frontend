import { createAsyncThunk } from '@reduxjs/toolkit';
import { cartApi } from 'shared/api/cart';
import { Cart, Product, UserId } from 'shared/types';
import { RootState } from 'store/store';
import { cartModel } from '..';
import { debounce } from './debounce';
import { actions } from './cart.slice';

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
  const cartState = thunkApi.getState().cart.cartInfo as Cart;
  const products = cartState.products;
  const updatingProducts = products?.map((product) => {
    return { count: product.count, product: product.product._id };
  });
  return await cartApi.updateCartByUserId(userId, updatingProducts);
});

export const incrementProductInCartThunk = createAsyncThunk<
  void,
  Product,
  { state: RootState }
>('cart/incrementProductInCartThunk', async (product: Product, thunkApi) => {
  const userId = thunkApi.getState().user.userInfo._id;
  thunkApi.dispatch(cartModel.actions.incrementProductInCart(product));
  debounce(userId, thunkApi, debounceCartThunk);
});

export const decrementProductInCartThunk = createAsyncThunk<
  void,
  Product,
  { state: RootState }
>('cart/decrementProductInCartThunk', async (product: Product, thunkApi) => {
  const userId = thunkApi.getState().user.userInfo._id;
  thunkApi.dispatch(cartModel.actions.decrementProductInCart(product));
  debounce(userId, thunkApi, debounceCartThunk);
});

export const resetCartThunk = createAsyncThunk(
  'cart/resetCartThunk',
  async (userId: UserId, thunkApi) => {
    await cartApi.updateCartByUserId(userId, []);
    thunkApi.dispatch(loadCartByUserIdThunk(userId));
  },
);

export const setCartErrorThunk = createAsyncThunk(
  'cart/setCartErrorThunk',
  async (cartErrorProductNameList: string[], thunkApi) => {
    thunkApi.dispatch(actions.setCartError(cartErrorProductNameList));
    setTimeout(() => {
      thunkApi.dispatch(actions.removeCartError());
    }, 2000);
  },
);
