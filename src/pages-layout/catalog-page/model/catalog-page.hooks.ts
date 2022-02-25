import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { CategoryId } from 'shared/types';
import { catalogModel } from 'entities/catalog';
import { useWindowWidth } from 'shared/hooks';
import { refreshCatalog } from 'entities/catalog/model';

export const useUpdateCatalogAfterReset = (categoryId: CategoryId) => {
  const dispatch = useAppDispatch();
  const rowItemsNumber = useWindowWidth();
  const catalog = useAppSelector(catalogModel.selectors.catalog);
  const { columnItemsNumber } = catalog;

  const isRowsChanges =
    catalog.limit / rowItemsNumber !== catalog.columnItemsNumber;

  useEffect(() => {
    if (isRowsChanges && catalog.categoryId) {
      console.log(catalog.categoryId);
      console.log('RowsChanges');
      dispatch(refreshCatalog());
      dispatch(
        catalogModel.thunks.loadProductsWithPagination({
          categoryId,
          page: 1,
          limit: rowItemsNumber * columnItemsNumber,
        }),
      );
    }
  }, [
    catalog.categoryId,
    categoryId,
    columnItemsNumber,
    dispatch,
    isRowsChanges,
    rowItemsNumber,
  ]);
};

export const useInfinityProductsLoader = (categoryId: CategoryId) => {
  const dispatch = useAppDispatch();
  const rowItemsNumber = useWindowWidth();
  const catalog = useAppSelector(catalogModel.selectors.catalog);
  const { columnItemsNumber, status, rows, page: currentPage } = catalog;
  const isLoading = status === 'pending';

  const productsCount = useMemo(() => {
    return Object.values(rows).reduce((count, row) => row.length + count, 0);
  }, [rows]);

  const rowsCount = Math.ceil(productsCount / rowItemsNumber) + 4;
  const maxRows = Math.ceil(catalog.length / rowItemsNumber);
  const hasNextPage = currentPage < catalog.lastPage;

  const fetchNextPage = useCallback(() => {
    if (!categoryId) {
      return;
    }

    dispatch(
      catalogModel.thunks.loadProductsWithPagination({
        categoryId,
        page: currentPage + 1,
        limit: rowItemsNumber * columnItemsNumber,
      }),
    );
  }, [categoryId, columnItemsNumber, currentPage, dispatch, rowItemsNumber]);

  return {
    rows,
    hasNextPage,
    isLoading,
    fetchNextPage,
    rowsCount,
    maxRows,
  };
};
