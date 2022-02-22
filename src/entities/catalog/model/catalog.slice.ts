import { Product } from 'shared/types';
import { createSlice } from '@reduxjs/toolkit';
import { loadProductsWithPagination } from './catalog.thunks';
import { convertPageToRows } from './convertPageToRows';

type CatalogState = {
  catalogInfo: {
    length: number;
    page: number;
    limit: number;
    lastPage: number;
    columnItemsNumber: number;
    rows: { [rowIndex: number]: Product[] };
    status: 'idle' | 'pending' | 'success' | 'error';
  };
};

const initialState: CatalogState = {
  catalogInfo: {
    length: 0,
    page: 0,
    limit: 0,
    lastPage: 0,
    columnItemsNumber: 4,
    rows: {},
    status: 'idle',
  },
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    refreshCatalog: (state, action) => {
      state.catalogInfo.length = 0;
      state.catalogInfo.length = 0;
      state.catalogInfo.page = 0;
      state.catalogInfo.limit = 0;
      state.catalogInfo.lastPage = 0;
      state.catalogInfo.columnItemsNumber = 4;
      state.catalogInfo.rows = {};
      state.catalogInfo.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadProductsWithPagination.pending,
      (state: CatalogState, action) => {
        state.catalogInfo.status = 'pending';
      },
    );

    builder.addCase(
      loadProductsWithPagination.fulfilled,
      (state: CatalogState, action) => {
        const newRows = convertPageToRows({
          page: action.payload.page,
          columnItemsNumber: state.catalogInfo.columnItemsNumber,
          limit: action.payload.limit,
          data: action.payload.data,
        });

        state.catalogInfo = {
          length: action.payload.length,
          page: action.payload.page,
          limit: action.payload.limit,
          lastPage: action.payload.lastPage,
          columnItemsNumber: state.catalogInfo.columnItemsNumber,
          rows: {
            ...state.catalogInfo.rows,
            ...newRows,
          },
          status: 'success',
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

export const { refreshCatalog } = catalogSlice.actions;
export const catalogReducer = catalogSlice.reducer;
