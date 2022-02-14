import { createSlice } from '@reduxjs/toolkit';
import { User } from 'shared/types';

type UserState = {
  userInfo: User;
};

const initialState: UserState = {
  userInfo: {
    _id: '620180e89517f53eb9f2102c',
    cart: '62043c899f42260bce05c32e',
    avatar: '',
    is_admin: true,
    is_auth: true,
    password: '',
    username: 'KristopherGalvan',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const { actions } = userSlice;
export const userReducer = userSlice.reducer;
