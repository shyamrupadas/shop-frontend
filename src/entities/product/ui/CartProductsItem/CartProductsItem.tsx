import { Box, Card, CardContent, CardMedia, Grid, Link, Typography } from '@mui/material';
import { Product } from 'shared/types';
import React from 'react';

type CartProductsItemProps = {
    product: Product;
    children?: React.ReactNode;
}

export const CartProductsItem = ({ product, children }: CartProductsItemProps) => {
    return (
        <Card sx={{ display: 'flex' }}>
            <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={product.iconUrl}
                alt={product.name}
            />

            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <CardContent>
                        <Link href='#'>
                            <Typography sx={{ fontSize: 'default', fontWeight: 'bold' }} >
                                {product.name}
                            </Typography>
                        </Link>
                        <Typography sx={{ fontSize: 'default' }} color="text.secondary" component='span'>
                            Beats
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={6}>
                    {children}
                </Grid>
            </Grid>
        </Card>
    )
};

type CartProductsItemActionsProps = {
    children?: React.ReactNode;
}

const CartProductsItemActions = ({ children }: CartProductsItemActionsProps) => {
    const childrenCount = React.Children.count(children);
    const gridItemSize = Math.ceil(12 / childrenCount );

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0}
            style={{ minHeight: '100%' }}
        >
            {React.Children.map(children, (actionItem) => (
                <Grid item xs={gridItemSize}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  minHeight: '100%'}}>
                        {actionItem}
                    </Box>
                </Grid>
            ))}
        </Grid>
    )
};

CartProductsItem.Actions = CartProductsItemActions;
