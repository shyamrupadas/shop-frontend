import { Card, CardContent, CardMedia, Grid, Link, Typography } from '@mui/material';
import { Product } from 'shared/types';

type CartProductsItemProps = {
    product: Product;
    renderActions: JSX.Element;
}

export const CartProductsItem = ({ product, renderActions }: CartProductsItemProps) => {
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
                    {renderActions}
                </Grid>
            </Grid>
        </Card>
    )
};
