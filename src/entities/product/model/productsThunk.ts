import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from '../../../shared/api/products';

export const getProductsThunk = createAsyncThunk(
  'products/getProductsThunk',
  async (id: string) => {
    const products = getProducts(id);
    return products;
  },
);
