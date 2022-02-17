import { Badge, Box, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React from 'react';
import Link from 'next/link';
import { useAppSelector } from 'store/store';
import { cartModel, CartNotification } from 'entities/cart';

export const SmallCartButton = () => {
  const boxRef = React.useRef();

  const cartProductsCount = useAppSelector(
    cartModel.selectors.cartProductsCount,
  );

  const overstockedProducts = useAppSelector(
    cartModel.selectors.overstockedProducts,
  );

  const { isOpen, anchorElement, notification, closeNotification } =
    cartModel.hooks.useCartNotification(boxRef);

  return (
    <Box ref={boxRef}>
      <Link href="/cart" passHref>
        <IconButton aria-label="cart" component="span">
          <Badge badgeContent={cartProductsCount} color="secondary">
            <ShoppingCartIcon color={'inherit'} />
          </Badge>
        </IconButton>
      </Link>

      {anchorElement && isOpen && (
        <CartNotification
          isOpen={isOpen}
          onClose={closeNotification}
          anchorElement={anchorElement}
        >
          <CartNotification.Title>
            Ваша корзина обновлена с учетом наличия товаров на складе:
          </CartNotification.Title>
          <CartNotification.MessagesList>
            {overstockedProducts.map((cartProduct) => (
              <CartNotification.Message key={cartProduct.product._id}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}— «
                {cartProduct.product.name}» доступно {cartProduct.count} шт
              </CartNotification.Message>
            ))}
          </CartNotification.MessagesList>
        </CartNotification>
      )}
    </Box>
  );
};
