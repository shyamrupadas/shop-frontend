import { createSelector } from 'reselect';
import { CartProduct, CartProductUpdate, ProductId } from 'shared/types';
import { RootState } from 'store/store';

export const cart = (state: RootState) => state?.cart?.cartInfo;
export const cartTotal = createSelector(cart, (cartState) => cartState?.total);
export const cartProducts = createSelector(cart, (cartState) => cartState?.products);

/**
 * Возвращает CartProduct или null по идентификатору продукта (ProductId)
 */
export const productById = createSelector(
    [
        cartProducts,
        (state, productId: ProductId): ProductId => productId,
    ],
    (cartProducts: CartProduct[] | undefined, productId): CartProduct | null => {
        const cartProduct = cartProducts?.find((cartProduct) => cartProduct.product._id === productId);
        return cartProduct || null;
    }
);

/**
 * Возвращает стоимость конкретного товара в корзине
 */
export const positionSum = createSelector(
    productById,
    (cartProduct): number | null => {
        if (!cartProduct || !cartProduct?.product) {
            return null;
        }

        return cartProduct.count * cartProduct.product.price;
    },
);

/**
 * Возвращает Map с данными для обновления товаров в корзине
 */
export const cartProductsForUpdate = createSelector(
    cartProducts,
    (cartProducts) => {
        const updatedProductsList: [ProductId, CartProductUpdate][] | undefined = cartProducts?.map((cartProduct) => {
            const update: CartProductUpdate = {
                count: cartProduct.count,
                product: cartProduct.product._id,
            };

            return [cartProduct.product._id, update];
        });

        return new Map<ProductId, CartProductUpdate>(updatedProductsList || []);
    },
);
