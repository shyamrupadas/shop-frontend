import { Cart, CartProduct, CartProductUpdate, Product } from 'shared/types';

const getProductsCount = (cart: Cart): number => {
  return cart.products.reduce(
    (productsCount: number, cartProduct: CartProduct) => {
      return (productsCount += cartProduct.count);
    },
    0,
  );
};

const getTotal = (cart: Cart): number => {
  return cart.products.reduce((total: number, cartProduct: CartProduct) => {
    return (total += cartProduct.count * cartProduct.product.price);
  }, 0);
};

const setTotalAndProductsCount = (cart: Cart): Cart => {
  cart.productsCount = getProductsCount(cart);
  cart.total = getTotal(cart);

  return cart;
};

export const addProductToCart = (cart: Cart, product: Product): Cart => {
  const newCartProduct: CartProduct = {
    count: 1,
    product,
  };

  cart.products.push(newCartProduct);

  return setTotalAndProductsCount(cart);
};

export const findCartProductIndex = (cart: Cart, product: Product): number => {
  return cart.products.findIndex((cartProduct) => {
    return cartProduct.product._id === product._id;
  });
};

export const findCartProduct = (
  cart: Cart,
  product: Product,
): CartProduct | null => {
  const cartProductIndex = findCartProductIndex(cart, product);

  if (cartProductIndex === -1) {
    return null;
  }

  return cart.products[cartProductIndex];
};

export const increaseProduct = (cart: Cart, product: Product): Cart => {
  const cartProduct = findCartProduct(cart, product);

  // Товара нет в корзине. Добавляем:
  if (!cartProduct) {
    return addProductToCart(cart, product);
  }

  // Товар уже есть корзине. Увеличиваем количество:
  cartProduct.count += 1;

  return setTotalAndProductsCount(cart);
};

export const decreaseProduct = (cart: Cart, product: Product): Cart => {
  const cartProductIndex = findCartProductIndex(cart, product);

  // Товара нет в корзине, ничего не делаем:
  if (cartProductIndex === -1) {
    return cart;
  }

  const cartProduct = cart.products[cartProductIndex];
  cartProduct.count -= 1;

  // Если количество товара меньше или равно 0, то удаляем его
  if (cartProduct.count <= 0) {
    cart.products.splice(cartProductIndex, 1);
  }

  return setTotalAndProductsCount(cart);
};

export const setProductCount = (
  cart: Cart,
  productUpdateData: CartProductUpdate,
) => {
  const cartProduct = cart.products.find((cartProduct) => {
    return cartProduct.product._id === productUpdateData.product;
  });

  if (!cartProduct) {
    return null;
  }

  cartProduct.count = productUpdateData.count;
};
