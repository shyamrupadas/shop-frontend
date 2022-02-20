import { AnyAction, AsyncThunk, ThunkDispatch } from '@reduxjs/toolkit';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { Cart } from 'shared/types';
import { RootState } from 'store/store';

export let debounceTimer: NodeJS.Timeout | null = null;

export const debounce = (
  userId: string,
  dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
  debounceCartThunk: AsyncThunk<Cart, string, { state: RootState }>,
) => {
  if (debounceTimer) {
    console.log('debounce working already');
    return;
  }

  console.log('debounce start');

  debounceTimer = setTimeout(() => {
    console.log('debounce stop, send request');
    dispatch(debounceCartThunk(userId));
    debounceTimer = null;
  }, 2000);
};
