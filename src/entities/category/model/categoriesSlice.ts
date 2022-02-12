import { createEntityAdapter, createSlice, EntityAdapter } from '@reduxjs/toolkit';
import { Category } from 'shared/types/types';
import getCategoriesThunk from './categoriesThunk';

export const categoriesEntityAdapter: EntityAdapter<Category> = createEntityAdapter({
  selectId: (category) => category._id
})

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: categoriesEntityAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
      categoriesEntityAdapter.setAll(state, action.payload)
    })
  }
});

export default categoriesSlice.reducer;
