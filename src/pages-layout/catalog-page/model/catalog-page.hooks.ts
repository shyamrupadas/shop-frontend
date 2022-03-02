import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { CategoryId } from 'shared/types';
import { catalogModel } from 'entities/catalog';
import { refreshCatalog } from 'entities/catalog/model';

export const useRefreshCatalog = (rowItemsNumber: number) => {
  const dispatch = useAppDispatch();
  const catalog = useAppSelector(catalogModel.selectors.catalog);
  const { columnItemsNumber } = catalog;

  const isRowsChanges =
    catalog.limit / rowItemsNumber !== catalog.columnItemsNumber;

  useEffect(() => {
    if (isRowsChanges && catalog.categoryId) {
      dispatch(refreshCatalog({ limit: rowItemsNumber * columnItemsNumber }));
    }
  }, [
    catalog.categoryId,
    columnItemsNumber,
    dispatch,
    isRowsChanges,
    rowItemsNumber,
  ]);
};

export const useInfinityProductsLoader = (
  categoryId: CategoryId,
  rowItemsNumber: number,
) => {
  const dispatch = useAppDispatch();
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
    dispatch(
      catalogModel.thunks.loadProductsWithPagination({
        categoryId,
        page: currentPage + 1,
        limit: rowItemsNumber * columnItemsNumber,
      }),
    );
  }, [categoryId, columnItemsNumber, currentPage, dispatch, , rowItemsNumber]);

  return {
    rows,
    hasNextPage,
    isLoading,
    fetchNextPage,
    rowsCount,
    maxRows,
  };
};
