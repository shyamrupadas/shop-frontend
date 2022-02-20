import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ProductsItem from '../entities/product/ui/ProductsItem';
import { AddToCart } from '../features/add-to-cart';
import { useSelector } from 'react-redux';
import { productsSelector } from '../entities/product/model';

type CatalogPageProps = {
  name: string;
};

export const CatalogPage = ({ name }: CatalogPageProps) => {
  const products = useSelector(productsSelector.products);

  return (
    <Container maxWidth="lg">
      <Typography gutterBottom variant="h4" component="h2">
        {name}
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
