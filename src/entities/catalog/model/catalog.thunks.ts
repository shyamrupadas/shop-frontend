import { createAsyncThunk } from '@reduxjs/toolkit';
import { catalogApi } from 'shared/api/catalog';
import { CategoryId, PaginationWrapper, Product, UserId } from 'shared/types';

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
    console.log('catalog/loadProductsWithPagination', {
      categoryId,
      page,
      limit,
    });
    return await catalogApi.fetchProductsWithPagination(
      categoryId,
      page,
      limit,
    );
  },
);
