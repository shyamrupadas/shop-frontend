import { configureStore } from '@reduxjs/toolkit';
import categoriesSlice from 'entities/category/model/categoriesSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { userModel } from 'entities/user';
import { cartModel } from 'entities/cart';

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    user: userModel.userReducer,
    cart: cartModel.cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
