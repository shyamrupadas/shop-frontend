import React, { useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ProductsItem from 'entities/product/ui/ProductsItem';
import { AddToCart } from 'features/add-to-cart';
import { useSelector } from 'react-redux';
import productsSelectors from 'entities/product/model/productsSelectors';
import { useAppDispatch, useAppSelector } from 'store';
import { catalogModel } from 'entities/catalog';
import { useRouter } from 'next/router';

const CatalogPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  const catalog = useAppSelector(catalogModel.selectors.selectCatalog);
  const products = Object.values(catalog.data).flat();

  return (
    <Container maxWidth="lg">
      <Typography gutterBottom variant="h4" component="h2">
        Страница: {categoryId}
      </Typography>
      <Typography gutterBottom variant="h4" component="h2">
        {/*Todo получать название категории из стейта*/}
        Вода, соки, напитки
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={3} key={product._id}>
            <ProductsItem product={product}>
              {/* TODO: AddToCart не должен тут находиться. Композиция должна быть на уровне widget, page или app */}
              <AddToCart product={product} />
            </ProductsItem>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CatalogPage;
