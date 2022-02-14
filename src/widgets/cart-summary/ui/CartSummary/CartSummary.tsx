import { Button, Card, CardContent, Typography } from '@mui/material';
import { cartModel } from 'entities/cart';
import React from 'react';
import { useAppSelector } from 'store/store';

export const CartSummary = () => {
  const totalPrice = useAppSelector(cartModel.selectors.cartTotal);
  return (
    <Card sx={{ display: 'flex' }} style={{ position: 'sticky', top: '10px' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography variant="h6" component="h2">
          Общая стоимость:{' '}
        </Typography>
        <Typography variant="h6" component="h2">
          {totalPrice && `${totalPrice} ₽`}
        </Typography>
        <Button color="primary" variant="contained" fullWidth={true}>
          Оформить заказ
        </Button>
      </CardContent>
    </Card>
  );
};
