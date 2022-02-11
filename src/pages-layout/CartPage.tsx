import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { CartProductsList } from 'entities/product';
import { Product } from 'shared/api/product';
import { CartItem } from 'widgets/cart-item';
import { CartSummary } from 'widgets/cart-summary';

let productIdCounter = 1;
const productsFake: Product[] = new Array<Product>(10).fill({} as any).map(() => ({
    _id: String(productIdCounter++),
    name: 'First product',
    description: 'lorem ipsum',
    iconUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    price: 0,
    title: '',
    unitMeasure: 'шт',
}));

const CartPage = () => {
  return (
      <Container maxWidth="lg">
          <Typography variant="h1" gutterBottom>
              Корзина
          </Typography>

          <Grid container spacing={2}>
              <Grid item xs={8}>
                  <CartProductsList>
                      {productsFake.map((product) => (
                          <CartItem
                              product={product}
                              key={product._id}
                          />
                      ))}
                  </CartProductsList>
              </Grid>

              <Grid item xs={4}>
                  <CartSummary />
              </Grid>
          </Grid>
      </Container>
  );
};

export default CartPage;
