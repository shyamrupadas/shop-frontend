import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ProductsItem from 'entities/product/ui/ProductsItem';
import { AddToCart } from 'features/add-to-cart';
import { useAppDispatch, useAppSelector } from 'store';
import { catalogModel } from 'entities/catalog';
import { useRouter } from 'next/router';
import InfinityProductsList from '../InfinityProductsList';

type CatalogPageProps = {
  name: string;
  rowItemsNumber: number;
};

const ITEM_HEIGHT = 410;
const ITEM_WIDTH = 200;
const SSR_ROWS_COUNT = 4;

/**
 * TODO: Слишком много всего в компоненте. Лучше вынести логику в хуки
 */
const CatalogPage = ({ name, rowItemsNumber }: CatalogPageProps) => {
  const router = useRouter();
  const { categoryId } = router.query;
  const dispatch = useAppDispatch();

  const catalog = useAppSelector(catalogModel.selectors.catalog);
  const catalogLength = catalog.length;
  const columnItemsNumber = catalog.columnItemsNumber;
  const status = useAppSelector(catalogModel.selectors.status);
  const currentPage = useAppSelector(catalogModel.selectors.currentPage);
  const rows = catalog.rows;

  const productsCount = useMemo(() => {
    return Object.values(rows).reduce((count, row) => row.length + count, 0);
  }, [rows]);

  const rowsCount = Math.ceil(productsCount / rowItemsNumber) + 4;
  const maxRows = Math.ceil(catalog.length / rowItemsNumber);
  const hasNextPage = currentPage < catalog.lastPage;

  const isLoading = status === 'pending';
  const fetchNextPage = useCallback(() => {
    if (typeof categoryId !== 'string') {
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

  useEffect(() => {
    if (typeof categoryId !== 'string') {
      return;
    }

    if (status === 'idle') {
      dispatch(
        catalogModel.thunks.loadProductsWithPagination({
          categoryId,
          page: 1,
          limit: rowItemsNumber * columnItemsNumber,
        }),
      );
    }
  }, [status, categoryId, dispatch, rowItemsNumber, columnItemsNumber]);

  return (
    <Container maxWidth="lg">
      <Typography gutterBottom variant="h4" component="h2">
        {name}
      </Typography>

      <InfinityProductsList
        rows={rows}
        hasMore={hasNextPage}
        isFetching={isLoading}
        fetchItems={fetchNextPage}
        rowsCount={rowsCount < maxRows ? rowsCount : maxRows}
        itemWidth={ITEM_WIDTH}
        itemHeight={ITEM_HEIGHT}
        // Ширина списка для рендера на сервере
        ssrListWidth={1200}
        // Высота списка для рендера на сервере
        ssrListHeight={ITEM_HEIGHT * SSR_ROWS_COUNT}
        // Количество строк рендерящихся на сервере
        ssrRowsCount={SSR_ROWS_COUNT}
      >
        {(product, key) => (
          <Box key={key}>
            <ProductsItem product={product}>
              <AddToCart product={product} />
            </ProductsItem>
          </Box>
        )}
      </InfinityProductsList>
    </Container>
  );
};

export default CatalogPage;
