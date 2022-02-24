import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  cart,
  cartNotificationSelector,
  positionSum,
  productById,
} from './cart.selectors';
import {
  decrementProductInCartThunk,
  incrementProductInCartThunk,
  loadCartByUserIdThunk,
  resetCartThunk,
} from './cart.thunks';
import { Cart, CartProduct, Product, ProductId } from 'shared/types';
import { RootState, useAppDispatch, useAppSelector } from 'store/store';
import { userModel } from 'entities/user';
import { cartModel } from '..';

export const useCartSelector = (): Cart | null => {
  return useSelector(cart);
};

export const useCartIncrementDecrement = () => {
  const dispatch = useAppDispatch();

  const incrementProductCount = useCallback(
    (product: Product) => {
      dispatch(incrementProductInCartThunk(product));
    },
    [dispatch],
  );

  const decrementProductCount = useCallback(
    (product: Product) => {
      dispatch(decrementProductInCartThunk(product));
    },
    [dispatch],
  );

  return {
    incrementProductCount,
    decrementProductCount,
  };
};

/**
 * Возвращает сумму для отдельного продукта в корзине (кол-во продукта в корзане умноженное на число) или null
 */
export const usePositionSumSelector = (productId: ProductId): number | null => {
  return useAppSelector((state) => positionSum(state, productId));
};

export const useCartProductSelector = (
  productId: ProductId,
): CartProduct | null => {
  return useSelector<RootState, CartProduct | null>((state) =>
    productById(state, productId),
  );
};

export const useCartProductCountSelector = (productId: ProductId): number => {
  const cartProduct = useCartProductSelector(productId);

  return cartProduct?.count || 0;
};

/**
 * Загружает с сервера корзину и закидывает ее в стор
 */
export const useCartLoad = (): void => {
  const user = userModel.hooks.useUserSelector();
  const dispatch = useAppDispatch();
  const userId = user._id;

  useEffect(() => {
    const promise = dispatch(loadCartByUserIdThunk(userId));

    return () => {
      promise.abort();
    };
  }, [userId, dispatch]);
};

export const useCartReset = () => {
  const dispatch = useAppDispatch();
  const user = userModel.hooks.useUserSelector();
  const userId = user._id;

  return useCallback(
    () => dispatch(resetCartThunk(userId)),
    [userId, dispatch],
  );
};

export const useCartNotification = (
  notificationRef: React.MutableRefObject<undefined>,
) => {
  const notification = useAppSelector(cartNotificationSelector);
  const isOpen = Boolean(notification);

  const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(
    null,
  );

  useEffect(
    () => setAnchorElement(notificationRef.current || null),
    [notificationRef, setAnchorElement],
  );

  return {
    isOpen,
    anchorElement,
    notification,
  };
};
