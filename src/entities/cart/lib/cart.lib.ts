import { Cart, CartProduct, Product } from 'shared/types';

function getProductsCount(cart: Cart): number {
  return cart.products.reduce(
    (productsCount: number, cartProduct: CartProduct) => {
      return (productsCount += cartProduct.count);
    },
    0,
  );
}

function getTotal(cart: Cart): number {
  return cart.products.reduce((total: number, cartProduct: CartProduct) => {
    return (total += cartProduct.count * cartProduct.product.price);
  }, 0);
}

function setTotalAndProductsCount(cart: Cart): Cart {
  cart.productsCount = getProductsCount(cart);
  cart.total = getTotal(cart);

  return cart;
}

export function addProductToCart(cart: Cart, product: Product): Cart {
  const newCartProduct: CartProduct = {
    count: 1,
    product,
  };

  cart.products.push(newCartProduct);

  return setTotalAndProductsCount(cart);
}

export function findCartProductIndex(cart: Cart, product: Product): number {
  return cart.products.findIndex((cartProduct) => {
    return cartProduct.product._id === product._id;
  });
}

export function findCartProduct(
  cart: Cart,
  product: Product,
): CartProduct | null {
  const cartProductIndex = findCartProductIndex(cart, product);

  if (cartProductIndex === -1) {
    return null;
  }

  return cart.products[cartProductIndex];
}

export function increaseProduct(cart: Cart, product: Product): Cart {
  const cartProduct = findCartProduct(cart, product);

  // Товара нет в корзине. Добавляем:
  if (!cartProduct) {
    return addProductToCart(cart, product);
  }

  // Товар уже есть корзине. Увеличиваем количество:
  cartProduct.count += 1;

  return setTotalAndProductsCount(cart);
}

export function decreaseProduct(cart: Cart, product: Product): Cart {
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
}
