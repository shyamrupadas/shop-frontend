import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { CartProductsList } from 'entities/product';
import { CartItem } from 'widgets/cart-item';
import { CartSummary } from 'widgets/cart-summary';
import { cartModel } from 'entities/cart';

const CartPage = () => {
  const cart = cartModel.hooks.useCartSelector();

  return (
    <Container maxWidth="lg">
      <Typography variant="h1" gutterBottom>
        Корзина
      </Typography>

      {!cart?.productsCount && (
        <Box>
          <Typography variant="h6" component="h2">
            Тут пока пусто
          </Typography>
          <Typography>
            Чтобы оформить заказ, положите товары в корзину
          </Typography>
        </Box>
      )}

      {!!cart?.productsCount && (
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <CartProductsList>
              {cart?.products.map((cartProduct) => (
                <CartItem
                  productId={cartProduct.product._id}
                  key={cartProduct.product._id}
                />
              ))}
            </CartProductsList>
          </Grid>

          <Grid item xs={4}>
            <CartSummary />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CartPage;
