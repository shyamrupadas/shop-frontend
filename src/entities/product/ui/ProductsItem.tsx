import { Product } from 'shared/types/types';
import styles from './ProductsItem.module.css';
import React from 'react';
import { Card, CardMedia, Grid, Typography } from '@mui/material';

type ProductsItemProps = {
  product: Product;
  children?: React.ReactNode;
  onClick: () => void;
};

export const ProductsItem = ({ product, children, onClick }: ProductsItemProps) => {
  return (
    <div className={styles.wrapper}>
      <Card
        onClick={onClick}
        sx={{
          width: 200,
          height: 390,
          padding: 2,
          paddingTop: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          border: 'none',
          boxShadow: 'none',
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          position="absolute"
          top="10px"
          left="16px"
        >
          {product.unitMeasure}
        </Typography>

        <CardMedia
          component="img"
          width="168"
          height="170"
          src={product.iconUrl}
          alt={product.name}
        />
        <Typography
          gutterBottom
          variant="subtitle2"
          color="text.secondary"
          component="h3"
        >
          {product.title}
        </Typography>
        <Grid container spacing={1} sx={{ flexWrap: 'nowrap' }}>
          <Grid item xs={5}>
            <Typography variant="h5">{product.price} p</Typography>
          </Grid>
          <Grid item xs={7}>
            {children}
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};
