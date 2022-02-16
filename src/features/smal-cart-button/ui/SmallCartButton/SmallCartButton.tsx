import { Badge, IconButton, Popover, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React from 'react';
import Link from 'next/link';
import { useAppSelector } from 'store/store';
import { cartModel } from 'entities/cart';

const ProductNameWithErrorList = [
  'Напиток кокосовый Alpro Barista с соей 1,4% 1 л',
  'Сухарики Finn Crisp ржаные 200 г',
];

export const SmallCartButton = () => {
  const cartProductsCount = useAppSelector(
    cartModel.selectors.cartProductsCount,
  );
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Link href="/cart" passHref>
        <IconButton aria-label="cart" component="span" onMouseOut={handleClick}>
          <Badge badgeContent={cartProductsCount} color="secondary">
            <ShoppingCartIcon color={'inherit'} />
          </Badge>
        </IconButton>
      </Link>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
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
