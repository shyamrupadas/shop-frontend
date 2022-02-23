import { createAsyncThunk } from '@reduxjs/toolkit';
import { catalogApi } from 'shared/api/catalog';
import { CategoryId, PaginationWrapper, Product } from 'shared/types';

type ProductsWithPaginationArgs = {
  categoryId: CategoryId;
  page: number;
  limit: number;
};

export const loadProductsWithPagination = createAsyncThunk<
  PaginationWrapper<Product[]>,
  ProductsWithPaginationArgs
>(
  'catalog/loadProductsWithPagination',
  async ({ categoryId, page, limit }, thunkApi) => {
    return await catalogApi.fetchProductsWithPagination(
      categoryId,
      page,
      limit,
    );
  },
);
