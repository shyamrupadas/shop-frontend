import { useCallback } from 'react';
import { ProductId } from 'shared/types';
import { cartModel } from 'entities/cart';

export function useAddToCart(productId: ProductId) {
  const productCount = cartModel.hooks.useCartProductCountSelector(productId);
  const { incrementProductCount, decrementProductCount } =
    cartModel.hooks.useCartIncrementDecrement();

  const handleDecrementClick = useCallback(() => {
    decrementProductCount(productId);
  }, [productId, decrementProductCount]);

  const handleIncrementClick = useCallback(() => {
    incrementProductCount(productId);
  }, [productId, incrementProductCount]);

  return {
    productCount,
    handleDecrementClick,
    handleIncrementClick,
  };
}
