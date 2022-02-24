import { Product } from 'shared/types';
import { useAppDispatch, useAppSelector } from 'store';
import { closeProduct, openProduct } from './catalog.slice';
import { useCallback } from 'react';
import { openedProduct as openedProductSelector } from './catalog.selectors';

export const useProductDetail = (product: Product | null) => {
  const dispatch = useAppDispatch();
  const openedProduct = useAppSelector(openedProductSelector);
  const isOpened = Boolean(openedProduct);

  const openProductDetail = useCallback(() => {
    if (!product) {
      return;
    }

    dispatch(openProduct(product));
  }, [product, dispatch]);

  const closeProductDetail = useCallback(() => {
    dispatch(closeProduct());
  }, [dispatch]);

  return {
    openProductDetail,
    closeProductDetail,
    isOpened,
  };
};
