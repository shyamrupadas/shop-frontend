import { Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';

export const CartSummary = () => {
    return (
        <Card sx={{ display: 'flex' }} style={{ position: 'sticky', top: '10px'}}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant='h6' component='h2'>Оформление заказа </Typography>
                <Typography variant='h6' component='h2'>Общая стоимость: </Typography>
                <Typography variant='h6' component='h2'>12 500 ₽ </Typography>
                <Button color='primary' variant='contained' fullWidth={true}>Оформить заказ</Button>
            </CardContent>
        </Card>
    )
}
