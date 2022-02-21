import React, { useCallback, useEffect, useMemo } from 'react';
import { Container, Typography } from '@mui/material';
import ProductsItem from 'entities/product/ui/ProductsItem';
import { AddToCart } from 'features/add-to-cart';
import { useAppDispatch, useAppSelector } from 'store';
import { catalogModel } from 'entities/catalog';
import { useRouter } from 'next/router';
import InfinityProductsList from '../InfinityProductsList';

type CatalogPageProps = {
  name: string;
};

const CatalogPage = ({ name }: CatalogPageProps) => {
  const router = useRouter();
  const { categoryId } = router.query;
  const dispatch = useAppDispatch();

  const catalog = useAppSelector(catalogModel.selectors.catalog);
  const status = useAppSelector(catalogModel.selectors.status);
  const currentPage = useAppSelector(catalogModel.selectors.currentPage);
  const products = useMemo(
    () => Object.values(catalog.data).flat(),
    [catalog.data],
  );

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
        limit: 20,
      }),
    );
  }, [currentPage, categoryId, dispatch]);

  useEffect(() => {
    if (typeof categoryId !== 'string') {
      return;
    }

    if (status === 'idle') {
      dispatch(
        catalogModel.thunks.loadProductsWithPagination({
          categoryId,
          page: 1,
          limit: 20,
        }),
      );
    }
  }, [status, categoryId, dispatch]);

  return (
    <Container maxWidth="lg">
      <Typography gutterBottom variant="h4" component="h2">
        {name}
      </Typography>

      <InfinityProductsList
        products={products}
        hasMore={hasNextPage}
        isFetching={isLoading}
        fetchItems={fetchNextPage}
        rowsCount={catalog.length / 5} // TODO: !!!
      >
        {(product, key) => (
          <ProductsItem product={product} key={key}>
            <AddToCart product={product} />
          </ProductsItem>
        )}
      </InfinityProductsList>
    </Container>
  );
};

export default CatalogPage;
