import { AnyAction, AsyncThunk, ThunkDispatch } from '@reduxjs/toolkit';
import { Cart } from 'shared/types';
import { RootState } from 'store/store';

export let debounceTimer: NodeJS.Timeout | null = null;

export const debounce = (
  userId: string,
  dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
  debounceCartThunk: AsyncThunk<Cart, string, { state: RootState }>,
) => {
  if (debounceTimer) {
    return;
  }

  debounceTimer = setTimeout(() => {
    dispatch(debounceCartThunk(userId));
    debounceTimer = null;
  }, 2000);
};
