import Image from 'next/image';
import { Product } from 'shared/types/types';
import styles from './ProductsItem.module.css';
import React from 'react';
import { Grid } from '@mui/material';

type ProductsItemProps= {
  product: Product;
  children?: React.ReactNode;
};

const ProductsItem = ({ product, children }: ProductsItemProps) => {
  return (
    <div className={styles.wrapper}>
      <Image
        width="200"
        height="170"
        src={product.iconUrl}
        alt={product.name}
        priority={true}
      />
      <h3 className={styles.title}>{product.title}</h3>
      <div className={styles.unitMeasure}>{product.unitMeasure}</div>
        <Grid container spacing={0}>
            <Grid item xs={6}>
                <div className={styles.price}>{product.price} p</div>
            </Grid>
            <Grid item xs={6}>
                {children}
            </Grid>
        </Grid>

    </div>
  );
};

export default ProductsItem;
