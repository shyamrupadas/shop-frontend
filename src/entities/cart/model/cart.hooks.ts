import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { productById, cart, positionSum } from './cart.selectors';
import { decrementProductInCartThunk, incrementProductInCartThunk, loadCartByUserIdThunk } from './cart.thunks';
import { CartProduct, ProductId, Cart } from 'shared/types';
import { RootState, useAppDispatch, useAppSelector } from 'store/store';
import { userModel } from 'entities/user';

export function useCartSelector(): Cart | null {
    return useSelector(cart)
}

export function useCartIncrementDecrement() {
    const dispatch = useAppDispatch();

    const incrementProductCount = useCallback((productId) => {
        dispatch(incrementProductInCartThunk(productId));
    }, [dispatch]);

    const decrementProductCount = useCallback((productId) => {
        dispatch(decrementProductInCartThunk(productId));
    }, [dispatch]);

    return {
        incrementProductCount,
        decrementProductCount,
    };
}

/**
 * Возвращает сумму для отдельного продукта в корзине (кол-во продукта в корзане умноженное на число) или null
 */
export function usePositionSumSelector(productId: ProductId): number | null {
    return useAppSelector((state) => positionSum(state, productId));
}

export function useCartProductSelector(productId: ProductId): CartProduct | null {
    return useSelector<RootState, CartProduct | null>((state) => productById(state, productId));
}

export function useCartProductCountSelector(productId: ProductId): number {
    const cartProduct = useCartProductSelector(productId);

    return cartProduct?.count || 0;
}

/**
 * Загружает с сервера корзину и закидывает ее в стор
 */
export function useCartLoad(): void {
    const user = userModel.hooks.useUserSelector();
    const dispatch = useAppDispatch();
    const userId = user._id;

    useEffect(() => {
        const promise = dispatch(loadCartByUserIdThunk(userId));

        return () => {
            promise.abort();
        };
    }, [userId, dispatch]);
}