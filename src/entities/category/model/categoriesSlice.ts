import { createEntityAdapter, createSlice, EntityAdapter, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { Category } from 'shared/types/types';
import getCategoriesThunk from './categoriesThunk';

export const categoriesEntityAdapter: EntityAdapter<Category> = createEntityAdapter({
  selectId: (category) => category._id
})

const getInitialState = (): EntityState<Category> => {
  return categoriesEntityAdapter.getInitialState();
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: getInitialState(),
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      categoriesEntityAdapter.setAll(state, action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
      categoriesEntityAdapter.setAll(state, action.payload)
    })
  }
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
