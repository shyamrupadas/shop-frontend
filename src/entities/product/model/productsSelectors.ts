import { EntityState } from '@reduxjs/toolkit';
import { Product } from 'shared/types/types';
import { RootState } from 'store/store';
import { productsEntityAdapter } from './productsSlice';

const {
  selectIds: productsIds,
  selectById: productById,
  selectAll: products,
} = productsEntityAdapter.getSelectors(
  (state: RootState): EntityState<Product> => state.products,
);

const productsSelector = {
  productsIds,
  productById,
  products,
};

export default productsSelector;
