import { Product } from 'shared/types';
import { createSlice } from '@reduxjs/toolkit';
import { loadCartByUserIdThunk } from '../../cart/model/cart.thunks';
import { loadProductsWithPagination } from './catalog.thunks';

type CatalogState = {
  catalogInfo: {
    length: number;
    page: number;
    limit: number;
    lastPage: number;
    data: {
      [key: number]: Product[];
    };
  };
};

const initialState: CatalogState = {
  catalogInfo: {
    length: 0,
    page: 0,
    limit: 0,
    lastPage: 0,
    data: {},
  },
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      loadProductsWithPagination.fulfilled,
      (state: CatalogState, action) => {
        state.catalogInfo = {
          length: action.payload.length,
          page: action.payload.page,
          limit: action.payload.limit,
          lastPage: action.payload.lastPage,
          data: {
            ...state.catalogInfo.data,
            [action.payload.page]: action.payload.data,
          },
        };
      },
    );
    builder.addCase(
      loadProductsWithPagination.rejected,
      (state: CatalogState, action) => {
        console.log('Catalog fetch error:', action.error);
      },
    );
  },
});

export const { actions } = catalogSlice;
export const catalogReducer = catalogSlice.reducer;
