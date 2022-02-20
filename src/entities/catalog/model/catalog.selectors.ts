import { RootState } from 'store';

export const selectCatalog = (state: RootState) => state.catalog.catalogInfo;
