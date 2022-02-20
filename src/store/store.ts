import {
  Action,
  AnyAction,
  configureStore,
  EnhancedStore,
  PreloadedState,
  StateFromReducersMapObject,
  ThunkAction,
} from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { ThunkMiddleware } from 'redux-thunk';
import categoriesSlice from 'entities/category/model/categoriesSlice';
import { userModel } from 'entities/user';
import { cartModel } from 'entities/cart';
import productsSlice from '../entities/product/model/productsSlice';
import { catalogModel } from 'entities/catalog';

const rootReducer = {
  categories: categoriesSlice,
  products: productsSlice,
  user: userModel.userReducer,
  cart: cartModel.cartReducer,
  catalog: catalogModel.catalogReducer,
};

export let store: EnhancedStore<
  RootState,
  AnyAction,
  [ThunkMiddleware<RootState, AnyAction, null> | ThunkMiddleware]
>;

export const initStore = (preloadedState?: PreloadedState<RootState>) => {
  store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });
  return store;
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

export const getStore = (preloadedState?: PreloadedState<RootState>) =>
  store ? store : initStore(preloadedState);

export const useStore = (preloadedState: PreloadedState<RootState>) => {
  return useMemo(() => getStore(preloadedState), [preloadedState]);
};
