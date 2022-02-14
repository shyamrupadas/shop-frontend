import {
  Action,
  configureStore,
  PreloadedState,
  StateFromReducersMapObject,
  ThunkAction,
} from '@reduxjs/toolkit';
import categoriesSlice from 'entities/category/model/categoriesSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { userModel } from 'entities/user';
import { cartModel } from 'entities/cart';
import { useMemo } from 'react';

const rootReducer = {
  categories: categoriesSlice,
  user: userModel.userReducer,
  cart: cartModel.cartReducer,
};

export const initStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof initStore>;
export type RootState = StateFromReducersMapObject<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useStore = (preloadedState: PreloadedState<RootState>) => {
  return useMemo(() => initStore(preloadedState), [preloadedState]);
};
