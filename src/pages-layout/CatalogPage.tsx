import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ProductsItem from '../entities/product/ui/ProductsItem';
import { AddToCart } from '../features/add-to-cart';
import { useSelector } from 'react-redux';
import productsSelectors from '../entities/product/model/productsSelectors';

export const CatalogPage = () => {
  const products = useSelector(productsSelectors.products);

  return (
    <Container maxWidth="lg">
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
