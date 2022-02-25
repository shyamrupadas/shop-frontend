import { Product } from 'shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadProductsWithPagination } from './catalog.thunks';
import { convertPageToRows } from './convertPageToRows';

type CatalogState = {
  catalogInfo: {
    categoryId: string | null;
    length: number;
    page: number;
    limit: number;
    lastPage: number;
    columnItemsNumber: number;
    rows: { [rowIndex: number]: Product[] };
    status: 'idle' | 'pending' | 'success' | 'error';
  };
  openedProduct: null | Product;
};

const initialState: CatalogState = {
  catalogInfo: {
    categoryId: null,
    length: 0,
    page: 0,
    limit: 0,
    lastPage: 0,
    columnItemsNumber: 4,
    rows: {},
    status: 'idle',
  },
  openedProduct: null,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<string>) => {
      state.catalogInfo.categoryId = action.payload;
    },
    refreshCatalog: (state) => {
      state.catalogInfo = {
        categoryId: state.catalogInfo.categoryId,
        length: 0,
        page: 0,
        limit: 0,
        lastPage: 0,
        columnItemsNumber: 4,
        rows: {},
        status: 'idle',
      };
    },
    setCatalogInfo: (
      state: CatalogState,
      action: PayloadAction<CatalogState>,
    ) => {
      state.catalogInfo = action.payload.catalogInfo;
    },
    openProduct: (state, action: PayloadAction<Product>) => {
      state.openedProduct = action.payload;
    },
    closeProduct: (state) => {
      state.openedProduct = null;
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
          categoryId: state.catalogInfo.categoryId,
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

export const {
  setCategoryId,
  refreshCatalog,
  openProduct,
  closeProduct,
  setCatalogInfo,
} = catalogSlice.actions;
export const catalogReducer = catalogSlice.reducer;
