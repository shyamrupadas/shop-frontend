import { CartProductsItem } from 'entities/product';
import { ProductId } from 'shared/types';
import React from 'react';
import { AddToCart } from 'features/add-to-cart';
import { cartModel, ProductSum } from 'entities/cart';
import { catalogModel } from 'entities/catalog';

type CartItemProps = {
  productId: ProductId;
};

export const CartItem = ({ productId }: CartItemProps) => {
  const productSum = cartModel.hooks.usePositionSumSelector(productId);
  const cartProduct = cartModel.hooks.useCartProductSelector(productId);

  const { openProductDetail } = catalogModel.hooks.useProductDetail(
    cartProduct?.product || null,
  );

  if (!cartProduct) {
    return null;
  }

  return (
    <CartProductsItem product={cartProduct.product} onClick={openProductDetail}>
      <CartProductsItem.Actions>
        <ProductSum sum={productSum || 0} />
        <AddToCart product={cartProduct.product} />
      </CartProductsItem.Actions>
    </CartProductsItem>
  );
};
