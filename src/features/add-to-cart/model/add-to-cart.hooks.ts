import { useCallback } from 'react';
import { Product, ProductId } from 'shared/types';
import { cartModel } from 'entities/cart';

export function useAddToCart(product: Product) {
  const productCount = cartModel.hooks.useCartProductCountSelector(product._id);
  const { incrementProductCount, decrementProductCount } =
    cartModel.hooks.useCartIncrementDecrement();

  const handleDecrementClick = useCallback(() => {
    decrementProductCount(product);
  }, [product, decrementProductCount]);

  const handleIncrementClick = useCallback(() => {
    incrementProductCount(product);
  }, [product, incrementProductCount]);

  return {
    productCount,
    handleDecrementClick,
    handleIncrementClick,
  };
}
