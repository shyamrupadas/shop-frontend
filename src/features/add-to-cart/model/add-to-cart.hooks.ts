import { useCallback } from 'react';
import { Product } from 'shared/types';
import { cartModel } from 'entities/cart';
import { useAppDispatch } from 'store/store';

export const useAddToCart = (product: Product) => {
  const dispatch = useAppDispatch();
  const productCount = cartModel.hooks.useCartProductCountSelector(product._id);
  const cartProduct = cartModel.hooks.useCartProductSelector(product._id);
  const isMaxCount = cartProduct?.isMaxCount || false;
  const { incrementProductCount, decrementProductCount } =
    cartModel.hooks.useCartIncrementDecrement();

  const handleDecrementClick = useCallback(() => {
    decrementProductCount(product);
    dispatch(cartModel.actions.allowAddToCart(product._id));
  }, [product, dispatch, decrementProductCount]);

  const handleIncrementClick = useCallback(() => {
    incrementProductCount(product);
  }, [product, incrementProductCount]);

  return {
    productCount,
    handleDecrementClick,
    handleIncrementClick,
    isMaxCount,
  };
};
