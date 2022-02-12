import { configureStore } from '@reduxjs/toolkit';
import categoriesSlice from 'entities/category/model/categoriesSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

export default store;
