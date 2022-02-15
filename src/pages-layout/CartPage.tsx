import { Box, Button, Container, Grid, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { CartProductsList } from 'entities/product';
import { CartItem } from 'widgets/cart-item';
import { CartSummary } from 'widgets/cart-summary';
import { cartModel } from 'entities/cart';
import Link from 'next/link';

type CartPageWrapper = {
  children: React.ReactNode;
};

const CartPageWrapper = ({ children }: CartPageWrapper) => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h1" gutterBottom>
        Корзина
      </Typography>

      {children}
    </Container>
  );
};

const CartPage = () => {
  const cart = cartModel.hooks.useCartSelector();
  const [isShowOrderSuccess, setIsShowOrderSuccess] = useState(false);
  const resetCart = cartModel.hooks.useCartReset();

  const handleOrdering = useCallback(() => {
    setIsShowOrderSuccess(true);
    resetCart();
  }, [resetCart]);

  if (isShowOrderSuccess) {
    return (
      <CartPageWrapper>
        <Box>
          <Typography
            variant="h6"
            component="h2"
            color="success.main"
            gutterBottom
          >
            Спасибо, ваш заказ № 123 успешно принят!
          </Typography>

          <Link href="/" passHref>
            <Button color="primary" variant="contained" component="span">
              Продолжить покупки
            </Button>
          </Link>
        </Box>
      </CartPageWrapper>
    );
  }
  return (
    <CartPageWrapper>
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
            <CartSummary onOrdering={handleOrdering} />
          </Grid>
        </Grid>
      )}
    </CartPageWrapper>
  );
};

export default CartPage;
