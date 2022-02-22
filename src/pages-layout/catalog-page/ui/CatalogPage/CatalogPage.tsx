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

const CatalogPage = ({ name, rowItemsNumber }: CatalogPageProps) => {
  const router = useRouter();
  const { categoryId } = router.query;
  const dispatch = useAppDispatch();

  const catalog = useAppSelector(catalogModel.selectors.catalog);
  const catalogLength = catalog.length;
  const rowsCount = Math.ceil(catalogLength / rowItemsNumber);
  const columnItemsNumber = catalog.columnItemsNumber;
  const status = useAppSelector(catalogModel.selectors.status);
  const currentPage = useAppSelector(catalogModel.selectors.currentPage);
  const rows = catalog.rows;

  const isLoading = status === 'pending';
  const hasNextPage = currentPage < catalog.lastPage;
  const fetchNextPage = useCallback(() => {
    if (typeof categoryId !== 'string') {
      return;
    }

    console.log('fetchNextPage:', currentPage + 1);

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
        rowsCount={rowsCount}
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
