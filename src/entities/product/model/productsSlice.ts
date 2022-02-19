import {
  createEntityAdapter,
  createSlice,
  EntityAdapter,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Product } from 'shared/types/types';
import { getProductsThunk } from './productsThunk';

export const productsEntityAdapter: EntityAdapter<Product> =
  createEntityAdapter({
    selectId: (product) => product._id,
  });

const getInitialState = (): EntityState<Product> => {
  return productsEntityAdapter.getInitialState();
};

const productsSlice = createSlice({
  name: 'products',
  initialState: getInitialState(),
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      productsEntityAdapter.setAll(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsThunk.fulfilled, (state, action) => {
      productsEntityAdapter.setAll(state, action.payload);
    });
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
