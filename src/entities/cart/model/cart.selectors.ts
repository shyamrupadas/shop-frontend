import { createSelector } from 'reselect';
import { CartProduct, CartProductUpdate, ProductId } from 'shared/types';
import { RootState } from 'store/store';

export const cart = (state: RootState) => state?.cart?.cartInfo;
export const cartProducts = createSelector(
  cart,
  (cartState) => cartState?.products,
);

export const cartProductsCount = createSelector(
  cartProducts,
  (cartProducts) => cartProducts?.length || 0,
);

export const cartTotal = createSelector(
  cartProducts,
  (cartProducts): number => {
    return (
      cartProducts?.reduce((total, cartProduct) => {
        return total + cartProduct.product.price * cartProduct.count;
      }, 0) || 0
    );
  },
);

/**
 * Возвращает CartProduct или null по идентификатору продукта (ProductId)
 */
export const productById = createSelector(
  [cartProducts, (state, productId: ProductId): ProductId => productId],
  (cartProducts: CartProduct[] | undefined, productId): CartProduct | null => {
    const cartProduct = cartProducts?.find(
      (cartProduct) => cartProduct.product._id === productId,
    );
    return cartProduct || null;
  },
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
    const updatedProductsList: [ProductId, CartProductUpdate][] | undefined =
      cartProducts?.map((cartProduct) => {
        const update: CartProductUpdate = {
          count: cartProduct.count,
          product: cartProduct.product._id,
        };

        return [cartProduct.product._id, update];
      });

    return new Map<ProductId, CartProductUpdate>(updatedProductsList || []);
  },
);

export const cartError = (state: RootState) =>
  state?.cart?.cartErrorProductNameList;
