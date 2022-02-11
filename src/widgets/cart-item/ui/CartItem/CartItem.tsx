import { CartProductsItem } from 'entities/product';
import { Product } from 'shared/api/product';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { AddToCart } from 'features/add-to-cart';
import { ProductSum } from '../../../../entities/cart';

type CartItemProps = {
    product: Product;
}

const CartItemActions = () => {
    return (
        <Grid container spacing={0} style={{ minHeight: '100%' }}>
            <Grid item xs={6} >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  minHeight: '100%'}}>
                    <ProductSum sum={12540} />
                </Box>
            </Grid>
            <Grid item xs={6} >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  minWidth: '100px', minHeight: '100%' }}>
                    <AddToCart />
                </Box>
            </Grid>
        </Grid>
    )
}

export const CartItem = ({ product }: CartItemProps) => {
    return (
        <CartProductsItem
            product={product}
            renderActions={<CartItemActions />}
        />
    )
}
