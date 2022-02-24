import React, { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import InfinityProductsList from '../InfinityProductsList';
import { ProductCard } from 'widgets/product-card';
import {
  useInfinityProductsLoader,
  useUpdateCatalogAfterReset,
} from '../../model/catalog-page.hooks';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { useWindowWidth } from '../../../../shared/hooks';
import { refreshCatalog } from '../../../../entities/catalog/model';
import { categoriesSelector } from '../../../../entities/category/model';
import { catalogModel } from 'entities/catalog';

const ITEM_HEIGHT = 410;
const ITEM_WIDTH = 200;
const SSR_ROWS_COUNT = 4;

const CatalogPage = () => {
  const router = useRouter();
  const { categoryId: _categoryId } = router.query;
  const categoryId = typeof _categoryId === 'string' ? _categoryId : '';
  const category = useAppSelector((state) =>
    categoriesSelector.categoryById(state, categoryId),
  );

  useUpdateCatalogAfterReset(categoryId);
  const { rows, hasNextPage, isLoading, fetchNextPage, rowsCount, maxRows } =
    useInfinityProductsLoader(categoryId);

  const categoryName = category?.name ?? '';

  return (
    <Container maxWidth="lg" sx={{ marginTop: '32px', marginBottom: '32px' }}>
      <Typography gutterBottom variant="h4" component="h2">
        {categoryName}
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
            <ProductCard product={product} />
          </Box>
        )}
      </InfinityProductsList>
    </Container>
  );
};

export default CatalogPage;
