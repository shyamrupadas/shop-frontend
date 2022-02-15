import { createAsyncThunk } from '@reduxjs/toolkit';
import { cartApi } from 'shared/api/cart';
import { Cart, CartProductUpdate, ProductId, UserId } from 'shared/types';
import { RootState } from 'store/store';
import { cartProductsForUpdate } from './cart.selectors';

export const loadCartByUserIdThunk = createAsyncThunk(
  'cart/loadCartByUserIdThunk',
  async (userId: UserId, thunkApi) => {
    return await cartApi.fetchCartByUserId(userId);
  },
);

export const incrementProductInCartThunk = createAsyncThunk<
  Cart,
  ProductId,
  { state: RootState }
>(
  'cart/incrementProductInCartThunk',
  async (productId: ProductId, thunkApi) => {
    return makeProductCountChange(productId, thunkApi.getState)(1);
  },
);

export const decrementProductInCartThunk = createAsyncThunk<
  Cart,
  ProductId,
  { state: RootState }
>(
  'cart/decrementProductInCartThunk',
  async (productId: ProductId, thunkApi) => {
    return makeProductCountChange(productId, thunkApi.getState)(-1);
  },
);

function makeProductCountChange(
  productId: ProductId,
  getState: () => RootState,
) {
  return async (count: number = 1) => {
    const userId = getState().user.userInfo?._id; // TODO: Связанность с user-ом

    if (!userId) {
      throw new Error(
        'Для добавления товара в корзину необходимо авторизоваться',
      );
    }

    const productsMap = cartProductsForUpdate(getState());

    // Изменяем кол-во товара
    if (productsMap.has(productId)) {
      const product = productsMap.get(productId);
      const newCount = (product && product.count + count) || 0;

      product &&
        productsMap.set(productId, {
          ...product,
          count: product.count + count,
        });

      if (newCount <= 0) {
        productsMap.delete(productId);
      }
    }
    // Дабавляем новый товар
    else {
      const newCartProduct: CartProductUpdate = {
        product: productId,
        count: 1,
      };
      productsMap.set(productId, newCartProduct);
    }

    try {
      const updatedCart = await cartApi.updateCartByUserId(userId, [
        ...productsMap.values(),
      ]);
      return await cartApi.fetchCartByUserId(userId); // TODO: избавиться от второго запроса
    } catch (error) {
      throw error;
    }
  };
}

export const resetCartThunk = createAsyncThunk(
  'cart/resetCartThunk',
  async (userId: UserId, thunkApi) => {
    await cartApi.updateCartByUserId(userId, []);
    thunkApi.dispatch(loadCartByUserIdThunk(userId));
  },
);
