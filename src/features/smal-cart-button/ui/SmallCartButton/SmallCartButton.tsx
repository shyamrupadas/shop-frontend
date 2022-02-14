import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React from 'react';
import Link from 'next/link';
import { useAppSelector } from 'store/store';
import { cartModel } from 'entities/cart';

export const SmallCartButton = () => {
  const cartProductsCount = useAppSelector(
    cartModel.selectors.cartProductsCount,
  );

  return (
    <Link href="/cart" passHref>
      <IconButton aria-label="cart" component="span">
        <Badge badgeContent={cartProductsCount} color="secondary">
          <ShoppingCartIcon color={'inherit'} />
        </Badge>
      </IconButton>
    </Link>
  );
};
