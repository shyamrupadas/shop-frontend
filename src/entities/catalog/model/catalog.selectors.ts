import { RootState } from 'store';

export const catalog = (state: RootState) => state.catalog.catalogInfo;
export const currentPage = (state: RootState) => state.catalog.catalogInfo.page;
export const status = (state: RootState) => state.catalog.catalogInfo.status;
export const openedProduct = (state: RootState) => state.catalog.openedProduct;
