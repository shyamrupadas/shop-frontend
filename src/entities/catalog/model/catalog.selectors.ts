import { RootState } from 'store';
import { createSelector } from 'reselect';

export const catalog = (state: RootState) => state.catalog.catalogInfo;
export const currentPage = createSelector(catalog, (catalog) => catalog.page);
export const status = createSelector(catalog, (catalog) => catalog.status);
