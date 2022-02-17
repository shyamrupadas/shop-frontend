import { Badge, IconButton, Popover, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React from 'react';
import Link from 'next/link';
import { useAppSelector } from 'store/store';
import { cartModel } from 'entities/cart';

export const SmallCartButton = () => {
  const cartProductsCount = useAppSelector(
    cartModel.selectors.cartProductsCount,
  );

  const ProductNameWithErrorList = useAppSelector(
    cartModel.selectors.cartError,
  );

  const open = Boolean(ProductNameWithErrorList.length);
  const id = open ? 'cart-error-popover' : undefined;

  return (
    <>
      <Link href="/cart" passHref>
        <IconButton aria-label="cart" component="span">
          <Badge badgeContent={cartProductsCount} color="secondary">
            <ShoppingCartIcon color={'inherit'} />
          </Badge>
        </IconButton>
      </Link>
      <Popover
        id={id}
        open={open}
        // Todo передать в anchorEl элемент IconButton
        // anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Typography sx={{ p: 2 }}>Внимание:</Typography>
        {ProductNameWithErrorList.map((name: string) => (
          <Typography key={name} sx={{ p: 1 }}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            товара "{name}" доступно только 5 шт
          </Typography>
        ))}
      </Popover>
    </>
  );
};
